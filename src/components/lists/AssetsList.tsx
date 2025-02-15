import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCryptoData } from "@/hooks/use-crypto-data";

const AssetsList = () => {
  const { data, isLoading, error } = useCryptoData();
  const [isOpen, setIsOpen] = useState(false);
  const [customAsset, setCustomAsset] = useState({
    name: '',
    amount: '',
    purchasePrice: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here we would typically save the asset
    console.log('New asset:', customAsset);
    setCustomAsset({ name: '', amount: '', purchasePrice: '' });
    setIsOpen(false);
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
                <Label htmlFor="name">Asset Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., Bitcoin"
                  value={customAsset.name}
                  onChange={(e) => setCustomAsset(prev => ({ ...prev, name: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  step="any"
                  placeholder="0.00"
                  value={customAsset.amount}
                  onChange={(e) => setCustomAsset(prev => ({ ...prev, amount: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="purchasePrice">Purchase Price (USD)</Label>
                <Input
                  id="purchasePrice"
                  type="number"
                  step="any"
                  placeholder="0.00"
                  value={customAsset.purchasePrice}
                  onChange={(e) => setCustomAsset(prev => ({ ...prev, purchasePrice: e.target.value }))}
                  className="bg-white/5 border-white/10 text-white"
                />
              </div>
              <Button 
                type="submit" 
                className="w-full bg-white/10 hover:bg-white/20 text-white border-white/10"
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