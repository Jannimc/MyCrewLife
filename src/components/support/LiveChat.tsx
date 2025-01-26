import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';

export function LiveChat() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-500 text-white rounded-full font-medium hover:opacity-90 transition-opacity duration-200 shadow-lg hover:shadow-emerald-500/25"
        >
          <MessageSquare className="w-5 h-5 mr-2" />
          Chat with Us
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-2xl shadow-xl w-96 h-[500px] flex flex-col animate-fade-in">
          {/* Chat Header */}
          <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-500 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center">
              <MessageSquare className="w-5 h-5 text-white mr-2" />
              <span className="text-white font-medium">Live Support</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:opacity-75 transition-opacity duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto">
            <div className="bg-emerald-50 rounded-lg p-3 max-w-[80%]">
              <p className="text-sm text-gray-800">
                Hi there! How can we help you today?
              </p>
              <span className="text-xs text-gray-500 mt-1 block">
                Support Team • Just now
              </span>
            </div>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-100">
            <div className="relative">
              <input
                type="text"
                placeholder="Type your message..."
                className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors duration-200"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 text-emerald-600 hover:text-emerald-700 transition-colors duration-200">
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}