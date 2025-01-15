'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card } from '@/components/Catalyst/card';
import { Text } from '@/components/Catalyst/text';
import { Button } from '@/components/Catalyst/button';
import { Progress } from '@/components/Catalyst/progress';
import { Sparkles, TrendingUp, Car, Clock, Users } from 'lucide-react';
import { AIRecommendations } from './AIRecommendations';

interface EnhancedDashboardProps {
  translations: {
    welcome: string;
    subtitle: string;
    newQuote: string;
    tradeIn: string;
    activeQuotes: string;
    avgSavings: string;
    dealerResponses: string;
    viewHistory: string;
    viewAll: string;
  };
  userData: {
    name: string;
    activeQuotes: number;
    avgSavings: number;
    dealerResponses: number;
  };
}

export function EnhancedDashboard({ translations, userData }: EnhancedDashboardProps) {
  const [selectedQuote, setSelectedQuote] = useState<string | null>(null);

  return (
    <div className="space-y-6 p-6">
      {/* Hero Section with Welcome Message */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <Text as="h1" className="text-3xl font-bold text-gray-900">
          {translations.welcome}, {userData.name}
        </Text>
        <Text className="text-gray-600 mt-2">
          {translations.subtitle}
        </Text>
      </motion.div>

      {/* Quick Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 cursor-pointer">
            <Car className="h-8 w-8 mb-4" />
            <Text as="h3" className="text-xl font-semibold mb-2">
              {translations.newQuote}
            </Text>
            <Button color="white" className="mt-4">
              Start Now
            </Button>
          </Card>
        </motion.div>
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white p-6 cursor-pointer">
            <TrendingUp className="h-8 w-8 mb-4" />
            <Text as="h3" className="text-xl font-semibold mb-2">
              {translations.tradeIn}
            </Text>
            <Button color="white" className="mt-4">
              Evaluate Now
            </Button>
          </Card>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Text className="text-gray-600">{translations.activeQuotes}</Text>
            <Clock className="h-5 w-5 text-blue-500" />
          </div>
          <Text as="h4" className="text-2xl font-bold">
            {userData.activeQuotes}
          </Text>
          <Progress value={userData.activeQuotes * 10} className="mt-2" />
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Text className="text-gray-600">{translations.avgSavings}</Text>
            <Sparkles className="h-5 w-5 text-green-500" />
          </div>
          <Text as="h4" className="text-2xl font-bold">
            ${userData.avgSavings.toLocaleString()}
          </Text>
          <Progress value={75} className="mt-2" color="success" />
        </Card>
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <Text className="text-gray-600">{translations.dealerResponses}</Text>
            <Users className="h-5 w-5 text-purple-500" />
          </div>
          <Text as="h4" className="text-2xl font-bold">
            {userData.dealerResponses}
          </Text>
          <Progress value={userData.dealerResponses * 8} className="mt-2" color="purple" />
        </Card>
      </div>

      {/* Recent Quotes with AI Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-6">
            <Text as="h3" className="text-xl font-semibold">
              Recent Quotes
            </Text>
            <Button variant="ghost" className="text-sm">
              {translations.viewAll}
            </Button>
          </div>
          <AnimatePresence>
            {/* Quote list items would go here */}
          </AnimatePresence>
        </Card>
        
        <div>
          <AIRecommendations 
            userId={userData.name} 
            translations={{
              title: "Smart Recommendations",
              no_recommendations: "No recommendations available"
            }}
          />
        </div>
      </div>
    </div>
  );
}
