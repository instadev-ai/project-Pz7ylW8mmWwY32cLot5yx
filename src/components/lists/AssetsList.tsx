import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCryptoData } from "@/hooks/use-crypto-data";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CryptoOption {
  id: string;
  name: string;
  symbol: string;
}

const AssetsList = () => {
  const { data, isLoading, error, addCrypto } = useCryptoData();
  const [isOpen, setIsOpen] = useState(false);
  const [availableCryptos, setAvailableCryptos] = useState<CryptoOption[]>([]);
  const [selectedCrypto, setSelectedCrypto] = useState<string>('');
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    const fetchAvailableCryptos = async () => {
      try {
        setSearchLoading(true);
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false'
        );
        
        if (!response.ok) throw new Error('Failed to fetch cryptos');
        
        const cryptos = await response.json();
        // Filter out cryptos that are already in our list
        const existingIds = new Set(data.map(c => c.id));
        const availableOptions = cryptos
          .filter(crypto => !existingIds.has(crypto.id))
          .map(crypto => ({
            id: crypto.id,
            name: crypto.name,
            symbol: crypto.symbol.toUpperCase(),
          }));
        
        setAvailableCryptos(availableOptions);
      } catch (err) {
        console.error('Error fetching available cryptos:', err);
      } finally {
        setSearchLoading(false);
      }
    };

    if (isOpen) {
      fetchAvailableCryptos();
    }
  }, [isOpen, data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCrypto) {
      await addCrypto(selectedCrypto);
      setSelectedCrypto('');
      setIsOpen(false);
    }
  };

  if (isLoading) {
    return (
      <Card className="p-6 backdrop-blur-md bg-white/10">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
          <div className="space-y-4">
            <div className="h-20 bg-gray-200 rounded w-full"></div>
            <div className="h-20 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 backdrop-blur-md bg-white/10">
        <p className="text-sm text-red-500">{error}</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 backdrop-blur-md bg-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-white">Assets</h2>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm" className="bg-white/5 border-white/10 text-white hover:bg-white/10">
              <Plus className="h-4 w-4 mr-2" />
              Add Asset
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#141413] border-white/10 text-white">
            <DialogHeader>
              <DialogTitle>Add New Asset</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="crypto">Select Cryptocurrency</Label>
                <Select
                  value={selectedCrypto}
                  onValueChange={setSelectedCrypto}
                >
                  <SelectTrigger className="bg-white/5 border-white/10 text-white">
                    <SelectValue placeholder="Select a cryptocurrency" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#141413] border-white/10 max-h-[300px]">
                    {searchLoading ? (
                      <div className="p-2 text-center text-white/60">Loading...</div>
                    ) : availableCryptos.map((crypto) => (
                      <SelectItem 
                        key={crypto.id} 
                        value={crypto.id}
                        className="text-white hover:bg-white/5"
                      >
                        {crypto.name} ({crypto.symbol})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button 
                type="submit" 
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/10"
                disabled={!selectedCrypto || searchLoading}
              >
                Add Asset
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <div className="space-y-4">
        {data.map((crypto) => (
          <div key={crypto.id} className="flex items-center justify-between p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="w-8 h-8">
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h3 className="font-medium text-white">{crypto.name}</h3>
                <p className="text-sm text-gray-400">{crypto.symbol.toUpperCase()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-white">
                ${crypto.current_price.toLocaleString()}
              </p>
              <p
                className={`text-sm ${
                  crypto.price_change_percentage_24h >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {crypto.price_change_percentage_24h >= 0 ? "+" : ""}
                {crypto.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AssetsList;