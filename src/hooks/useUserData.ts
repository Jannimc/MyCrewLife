import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import type { Database } from '../types/database';

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Booking = Database['public']['Tables']['bookings']['Row'];
export type LoyaltyPoints = Database['public']['Tables']['loyalty_points']['Row'];

export interface UserStats {
  nextCleaning: {
    date: string;
    time: string;
  } | null;
  totalBookings: number;
  averageRating: number;
  reviewCount: number;
  loyaltyPoints: number;
  loyaltyTier: string;
}

/**
 * Hook to fetch and manage user data from Supabase
 * Includes profile, bookings, and loyalty points
 */
export function useUserData() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loyaltyPoints, setLoyaltyPoints] = useState<LoyaltyPoints | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<UserStats>({
    nextCleaning: null,
    totalBookings: 0,
    averageRating: 0,
    reviewCount: 0,
    loyaltyPoints: 0,
    loyaltyTier: 'Bronze'
  });

  // Fetch user data function
  const fetchData = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      // Check if Supabase is properly initialized
      if (!supabase.auth.getSession) {
        throw new Error('Supabase client not properly initialized');
      }

      // Fetch profile data
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;
      setProfile(profileData);

      // Fetch bookings
      const { data: bookingsData, error: bookingsError } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true });

      if (bookingsError) throw bookingsError;
      setBookings(bookingsData || []);

      // Fetch loyalty points
      const { data: loyaltyData, error: loyaltyError } = await supabase
        .from('loyalty_points')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (!loyaltyError && loyaltyData) {
        setLoyaltyPoints(loyaltyData);
        calculateStats(bookingsData || [], loyaltyData);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch user data';
      setError(errorMessage);
      // Reset states on error
      setProfile(null);
      setBookings([]);
      setLoyaltyPoints(null);
      setStats({
        nextCleaning: null,
        totalBookings: 0,
        averageRating: 0,
        reviewCount: 0,
        loyaltyPoints: 0,
        loyaltyTier: 'Bronze'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { 
    fetchData();
  }, [user]);

  /**
   * Calculate user statistics from bookings and loyalty data
   */
  const calculateStats = (bookings: Booking[], loyalty: LoyaltyPoints | null) => {
    // Find next upcoming cleaning
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const upcomingBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      bookingDate.setHours(0, 0, 0, 0);
      return bookingDate >= today && booking.status !== 'cancelled';
    });

    const nextCleaning = upcomingBookings.length > 0 
      ? { 
          date: upcomingBookings[0].date,
          time: upcomingBookings[0].time 
        }
      : null;
    
    // Calculate total active bookings (not cancelled)
    const totalBookings = bookings.filter(booking => booking.status !== 'cancelled').length;

    // Calculate average rating
    const completedBookings = bookings.filter(booking => 
      booking.status === 'completed' && booking.rating !== null
    );
    
    const totalRating = completedBookings.reduce((sum, booking) => 
      sum + (booking.rating || 0), 0
    );
    
    const averageRating = completedBookings.length > 0 
      ? parseFloat((totalRating / completedBookings.length).toFixed(1)) 
      : 0;

    // Set stats
    setStats({
      nextCleaning,
      totalBookings,
      averageRating,
      reviewCount: completedBookings.length,
      loyaltyPoints: loyalty?.points || 0,
      loyaltyTier: loyalty?.tier || 'Bronze'
    });
  };

  // Refetch user data function
  const handleRefetch = async () => {
    setLoading(true);
    setError(null);
    fetchData();
  };

  // Return hook values
  return {
    profile,
    bookings,
    loyaltyPoints,
    stats,
    loading,
    error,
    refetchUserData: fetchData,
    upcomingBookings: bookings.filter(booking => {
      return booking.status === 'upcoming';
    }),
    pastBookings: bookings.filter(booking => {
      return booking.status === 'completed';
    }),
    cancelledBookings: bookings.filter(booking => booking.status === 'cancelled'),
  };
}