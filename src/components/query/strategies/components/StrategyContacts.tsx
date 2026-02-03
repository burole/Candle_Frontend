import React from 'react';
import { Phone, MapPin } from 'lucide-react';
import { Card } from '@/design-system/ComponentsTailwind';

interface PhoneData {
  areaCode: string;
  number: string;
  type?: string;
}

interface AddressData {
  street: string;
  number?: string;
  district: string;
  city: string;
  state: string;
  zip: string;
}

interface StrategyContactsProps {
  phones?: PhoneData[];
  addresses?: AddressData[];
}

export function StrategyContacts({ phones, addresses }: StrategyContactsProps) {
  if ((!phones || phones.length === 0) && (!addresses || addresses.length === 0)) {
    return null;
  }

  return (
    <>
      {phones && phones.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5 text-indigo-500" />
            Telefones de Contato
          </h3>
          <div className="flex flex-wrap gap-3">
            {phones.map((phone, idx) => (
              <div key={idx} className="flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-lg border border-gray-100">
                <div className="bg-white p-1.5 rounded-full shadow-sm">
                  <Phone className="w-3 h-3 text-gray-500" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">
                    ({phone.areaCode}) {phone.number}
                  </p>
                  {phone.type && (
                     <p className="text-[10px] text-gray-400 uppercase font-semibold">{phone.type}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {addresses && addresses.length > 0 && (
        <Card className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-indigo-500" />
            Endereços Encontrados
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                <p className="text-gray-800 font-medium leading-relaxed">
                  {address.street}{address.number ? `, ${address.number}` : ''}
                  <br />
                  {address.district}
                  <br />
                  {address.city} - {address.state}
                  <br />
                  <span className="text-gray-500 text-sm">CEP: {address.zip}</span>
                </p>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
