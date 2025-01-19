'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Car, DollarSign, MapPin, Calendar } from 'lucide-react';

// Mock data for vehicle types and years
const vehicleTypes = ['Sedan', 'SUV', 'Truck', 'Van', 'Sports Car', 'Luxury'];
const years = Array.from({ length: 2 }, (_, i) => (2024 + i).toString());

export default function NewQuotePage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [step, setStep] = useState(1);

  // Form state
  const [formData, setFormData] = useState({
    vehicleType: '',
    make: '',
    model: '',
    year: '',
    budget: '',
    location: '',
    additionalDetails: '',
    tradeIn: false,
    tradeInDetails: {
      make: '',
      model: '',
      year: '',
      mileage: '',
      condition: '',
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: string } }
  ) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="min-h-screen py-8">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => navigate('/dashboard/quotes')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {t('back')}
            </Button>
            <h1 className="text-3xl font-bold">{t('title')}</h1>
            <p className="text-gray-500 dark:text-gray-400 mt-2">
              {t('description')}
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`flex items-center ${
                  s < step ? 'text-blue-600' : 'text-gray-400'
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    s <= step
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-full h-1 mx-2 ${
                      s < step ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  {t('vehicleDetails')}
                </h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vehicleType">{t('fields.vehicleType')}</Label>
                      <Select
                        onValueChange={(value) => 
                          setFormData(prev => ({...prev, vehicleType: value}))
                        }
                        value={formData.vehicleType}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('select')} />
                        </SelectTrigger>
                        <SelectContent>
                          {vehicleTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="year">{t('fields.year')}</Label>
                      <Select
                        onValueChange={(value) => 
                          setFormData(prev => ({...prev, year: value}))
                        }
                        value={formData.year}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={t('select')} />
                        </SelectTrigger>
                        <SelectContent>
                          {years.map((year) => (
                            <SelectItem key={year} value={year}>
                              {year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="make">{t('fields.make')}</Label>
                      <Input
                        id="make"
                        name="make"
                        value={formData.make}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="model">{t('fields.model')}</Label>
                      <Input
                        id="model"
                        name="model"
                        value={formData.model}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {step === 2 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">
                  {t('preferences')}
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label htmlFor="budget">{t('fields.budget')}</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="budget"
                        name="budget"
                        type="number"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="location">{t('fields.location')}</Label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleInputChange}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="additionalDetails">
                      {t('fields.additionalDetails')}
                    </Label>
                    <Textarea
                      id="additionalDetails"
                      name="additionalDetails"
                      value={formData.additionalDetails}
                      onChange={handleInputChange}
                      rows={4}
                    />
                  </div>
                </div>
              </Card>
            )}

            {step === 3 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">{t('tradeIn')}</h2>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tradeInDetails.make">
                        {t('fields.tradeIn.make')}
                      </Label>
                      <Input
                        id="tradeInDetails.make"
                        name="tradeInDetails.make"
                        value={formData.tradeInDetails.make}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tradeInDetails.model">
                        {t('fields.tradeIn.model')}
                      </Label>
                      <Input
                        id="tradeInDetails.model"
                        name="tradeInDetails.model"
                        value={formData.tradeInDetails.model}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="tradeInDetails.year">
                        {t('fields.tradeIn.year')}
                      </Label>
                      <Input
                        id="tradeInDetails.year"
                        name="tradeInDetails.year"
                        type="number"
                        value={formData.tradeInDetails.year}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="tradeInDetails.mileage">
                        {t('fields.tradeIn.mileage')}
                      </Label>
                      <Input
                        id="tradeInDetails.mileage"
                        name="tradeInDetails.mileage"
                        type="number"
                        value={formData.tradeInDetails.mileage}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="tradeInDetails.condition">
                      {t('fields.tradeIn.condition')}
                    </Label>
                    <Select
                      onValueChange={(value) => 
                        setFormData(prev => ({
                          ...prev,
                          tradeInDetails: {
                            ...prev.tradeInDetails,
                            condition: value
                          }
                        }))
                      }
                      value={formData.tradeInDetails.condition}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={t('select')} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">{t('condition.excellent')}</SelectItem>
                        <SelectItem value="good">{t('condition.good')}</SelectItem>
                        <SelectItem value="fair">{t('condition.fair')}</SelectItem>
                        <SelectItem value="poor">{t('condition.poor')}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            )}

            <div className="mt-8 flex justify-between">
              {step > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep(step - 1)}
                >
                  {t('previous')}
                </Button>
              )}
              <div className="ml-auto">
                {step < 3 ? (
                  <Button
                    type="button"
                    onClick={() => setStep(step + 1)}
                  >
                    {t('next')}
                  </Button>
                ) : (
                  <Button type="submit">{t('submit')}</Button>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}