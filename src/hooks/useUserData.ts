import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './useAuth';
import { Database } from '../types/database';

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

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    async function fetchUserData() {
      setLoading(true);
      setError(null);

      try {
        // First, check if profile exists, if not create it
        const { data: existingProfile, error: checkError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (checkError) {
          console.error('Error checking profile:', checkError);
          throw checkError;
        }

        // If profile doesn't exist, create it
        if (!existingProfile) {
          const { error: insertError } = await supabase
            .from('profiles')
            .insert([
              { 
                id: user.id,
                full_name: user.user_metadata?.full_name || null,
                avatar_url: user.user_metadata?.avatar_url || null,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              }
            ]);

          if (insertError) {
            console.error('Error creating profile:', insertError);
            throw insertError;
          }

          // Also create loyalty points entry
          const { error: loyaltyInsertError } = await supabase
            .from('loyalty_points')
            .insert([
              {
                user_id: user.id,
                points: 0,
                tier: 'Bronze',
                updated_at: new Date().toISOString()
              }
            ]);

          if (loyaltyInsertError) {
            console.error('Error creating loyalty points:', loyaltyInsertError);
            // Non-critical error, continue
          }
        }

        // Now fetch the profile (either existing or newly created)
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .maybeSingle();

        if (profileError) {
          console.error('Error fetching profile:', profileError);
          throw profileError;
        }
        
        setProfile(profileData);

        // Fetch bookings
        const { data: bookingsData, error: bookingsError } = await supabase
          .from('bookings')
          .select('*')
          .eq('user_id', user.id)
          .order('date', { ascending: true });

        if (bookingsError) {
          console.error('Error fetching bookings:', bookingsError);
          throw bookingsError;
        }
        
        setBookings(bookingsData || []);

        // Fetch loyalty points
        const { data: loyaltyData, error: loyaltyError } = await supabase
          .from('loyalty_points')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle();

        if (loyaltyError) {
          console.error('Error fetching loyalty points:', loyaltyError);
          // Non-critical error, continue with default values
        }

        // If no loyalty data, create default
        if (!loyaltyData) {
          const defaultLoyalty = {
            user_id: user.id,
            points: 0,
            tier: 'Bronze',
            updated_at: new Date().toISOString()
          };
          
          setLoyaltyPoints(defaultLoyalty);
          calculateStats(bookingsData || [], defaultLoyalty);
        } else {
          setLoyaltyPoints(loyaltyData);
          calculateStats(bookingsData || [], loyaltyData);
        }
      } catch (err: any) {
        console.error('Error fetching user data:', err);
        setError(err.message);
        
        // Set default values even if there's an error
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
    }

    fetchUserData();
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
      return bookingDate >= today && booking.status === 'upcoming';
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const nextCleaning = upcomingBookings.length > 0 
      ? { date: upcomingBookings[0].date, time: upcomingBookings[0].time } 
      : null;

    // Calculate total bookings (last 12 months)
    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
    
    const recentBookings = bookings.filter(booking => {
      const bookingDate = new Date(booking.date);
      return bookingDate >= oneYearAgo;
    });

    const totalBookings = recentBookings.length;

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

  return {
    profile,
    bookings,
    loyaltyPoints,
    stats,
    loading,
    error,
    upcomingBookings: bookings.filter(booking => booking.status === 'upcoming'),
    pastBookings: bookings.filter(booking => booking.status === 'completed')
  };
}