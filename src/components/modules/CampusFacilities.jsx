import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { Building2, MapPin, Users, Cpu, ShieldCheck } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';

export const CampusFacilities = () => {
  const { facilities } = useData();
  const { addToast } = useToast();

  const handleBookFacility = (facility) => {
    addToast(`Booked reservation request for ${facility.name}`, 'success', 'Facility Reservation');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Campus Infrastructure & Facilities</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Real-time status tracking for computer labs, auditoriums, Quiet pods, sports ground, and dining halls.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map(facil => (
          <Card key={facil.id} hover>
            <CardHeader>
              <div>
                <Badge variant="indigo" size="sm">{facil.category}</Badge>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{facil.name}</h3>
              </div>
              <Badge variant={facil.status === 'Available' ? 'emerald' : 'amber'}>{facil.status}</Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-700 space-y-1.5">
                <p className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> {facil.location}
                </p>
                <p className="flex items-center gap-2 text-slate-500">
                  <Users className="w-3.5 h-3.5 text-blue-500" /> Max Capacity: {facil.capacity} Seats
                </p>
                <p className="flex items-center gap-2 text-slate-500">
                  <Cpu className="w-3.5 h-3.5 text-purple-500" /> Specs: {facil.hardware}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Manager: {facil.manager}</span>
                <Button variant="gradient" size="sm" onClick={() => handleBookFacility(facil)}>
                  Reserve Hall
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
