'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const CURRENT_VERSION = '0.1.0'; // Update this when you want to show the modal again
const LOCAL_STORAGE_KEY = 'lastSeenVersion';

export default function VersionUpdate() {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const lastSeenVersion = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (lastSeenVersion === null || lastSeenVersion !== CURRENT_VERSION) {
      setShowModal(true);
    }
  }, []);

  const closeModal = () => {
    setShowModal(false);
    localStorage.setItem(LOCAL_STORAGE_KEY, CURRENT_VERSION);
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className='w-[95%]'>
        <DialogHeader>
          <DialogTitle>JAUNA VERSIJA!</DialogTitle>
          <DialogDescription>
            Kļūdas, sūdzības un ieteikumus sūti uz emils.bisenieks93@gmail.com
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <ul className='list-disc list-inside space-y-2'>
            <li>
              Iespēja uzaicināt draugus, kuri jau lieto &quot;Zoles Punkti&quot;
            </li>
            <li>Pievieno uzaicinātos draugus spēlei</li>
            <li>
              Realtime sync - visi spēles dalībnieki var redzēt un labot
              rezultātus katrs savā ierīcē reāllaikā
            </li>
            <li>Punktu tabulai pievienots indikators &quot;Dalītājs&quot;</li>
            <li>Vairāki kļūdu labojumi</li>
          </ul>
        </div>
        <DialogFooter>
          <Button onClick={closeModal}>Sapratu, paldies!</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
