import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';
import { Container } from '@/components/Container';
import { MetricsCards } from '@/components/Metrics/MetricsCards';
import { QuoteAnalytics } from '@/components/Analytics/QuoteAnalytics';
import { LeadManagement } from '@/components/Leads/LeadManagement';
import { PerformanceMetrics } from '@/components/Analytics/PerformanceMetrics';
import { CommunicationHub } from '@/components/Communication/CommunicationHub';
import { DocumentCenter } from '@/components/Documents/DocumentCenter';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { Button } from '@/components/Catalyst/button';
import { Plus, MessageSquare, Upload, FileText, Eye } from 'lucide-react';

export default async function DealerDashboard() {
  const t = await getTranslations('DealerDashboard');

  return (
    <Container>
      <div className="min-h-screen bg-background">
        <div className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {/* Header */}
              <div className="card-header">
                <h1 className="card-title">
                  {t('title')}
                </h1>
                <div className="flex space-x-3">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    {t('viewAll')}
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('newQuote')}
                  </Button>
                </div>
              </div>

              {/* Smart Quote Analytics */}
              <section>
                <div className="card">
                  <Suspense fallback={<LoadingSpinner />}>
                    <QuoteAnalytics />
                  </Suspense>
                </div>
              </section>

              {/* Lead Management */}
              <section>
                <div className="card">
                  <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {t('leadManagement.title')}
                      </h2>
                      <Button size="sm">
                        <Plus className="h-4 w-4 mr-2" />
                        {t('leadManagement.newLead')}
                      </Button>
                    </div>
                  </div>
                  <Suspense fallback={<LoadingSpinner />}>
                    <LeadManagement />
                  </Suspense>
                </div>
              </section>

              {/* Performance Overview */}
              <section>
                <div className="card">
                  <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {t('performance.title')}
                      </h2>
                    </div>
                  </div>
                  <Suspense fallback={<LoadingSpinner />}>
                    <PerformanceMetrics />
                  </Suspense>
                </div>
              </section>

              {/* Communication Hub */}
              <section>
                <div className="card">
                  <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {t('communication.title')}
                      </h2>
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          {t('communication.allMessages')}
                        </Button>
                        <Button size="sm">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          {t('communication.newMessage')}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Suspense fallback={<LoadingSpinner />}>
                    <CommunicationHub />
                  </Suspense>
                </div>
              </section>

              {/* Document Center */}
              <section>
                <div className="card">
                  <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {t('documents.title')}
                      </h2>
                      <div className="flex space-x-3">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          {t('documents.viewAll')}
                        </Button>
                        <Button size="sm">
                          <Upload className="h-4 w-4 mr-2" />
                          {t('documents.upload')}
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Suspense fallback={<LoadingSpinner />}>
                    <DocumentCenter />
                  </Suspense>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
