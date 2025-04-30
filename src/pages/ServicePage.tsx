import { useEffect, useState } from 'react';
import axios from 'axios';
import { Skeleton } from '../components/ui/skeleton';
import { Card, CardContent } from '../components/ui/card';


type Service = {
  id: string;
  name: string;
  description: string;
};

export default function ServicePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Service Management</h1>

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-16 w-full" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* {services?.map(service => (
            <Card key={service.id} className="shadow-md hover:shadow-xl transition">
              <CardContent className="p-4">
                <h2 className="text-lg font-bold">{service?.name}</h2>
                <p className="text-muted-foreground text-sm">{service.description}</p>
              </CardContent>
            </Card>
          ))} */}
        </div>
      )}
    </div>
  );
}
