import React, { useState } from 'react';
import { getSupabaseClient } from '@/integrations/supabase/client';
import { useRouter } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

const VehiclePreferenceForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData(event.target as HTMLFormElement);
        const preferences = {
            make: formData.get('make'),
            model: formData.get('model'),
            year: formData.get('year'),
            budget: formData.get('budget'),
        };

        try {
            const supabaseClient = getSupabaseClient();
            const { data, error } = await supabaseClient
                .from('vehicle_preferences')
                .insert([preferences]);

            if (error) {
                console.error("Error saving preferences:", error);
                toast({
                    title: "Error saving preferences",
                    description: "Something went wrong. Please try again.",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Preferences saved",
                    description: "Your vehicle preferences have been saved successfully!",
                });
                router.push('/dashboard');
            }
        } catch (error) {
            console.error("Error saving preferences:", error);
            toast({
                title: "Error saving preferences",
                description: "Failed to save preferences. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8">
            <div className="mb-4">
                <label htmlFor="make" className="block text-gray-700 text-sm font-bold mb-2">
                    Make
                </label>
                <input type="text" id="make" name="make" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="model" className="block text-gray-700 text-sm font-bold mb-2">
                    Model
                </label>
                <input type="text" id="model" name="model" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-4">
                <label htmlFor="year" className="block text-gray-700 text-sm font-bold mb-2">
                    Year
                </label>
                <input type="text" id="year" name="year" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="mb-6">
                <label htmlFor="budget" className="block text-gray-700 text-sm font-bold mb-2">
                    Budget
                </label>
                <input type="text" id="budget" name="budget" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
            </div>
            <div className="flex items-center justify-between">
                <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Submitting...' : 'Save Preferences'}
                </Button>
            </div>
        </form>
    );
};

export default VehiclePreferenceForm;
