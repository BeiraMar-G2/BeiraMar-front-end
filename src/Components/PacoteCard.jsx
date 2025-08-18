import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit } from "lucide-react";

export default function PacoteCard({ nome, duracao, preco }) {
  return (
    <Card className="bg-red-200 shadow-md">
      <CardContent className="flex justify-between items-center p-3">
        <div>
          <p className="font-medium text-sm">{nome}</p>
          <p className="text-sm text-gray-600">Duração: {duracao}</p>
          <p className="text-sm text-gray-700 font-semibold">R$ {preco},00</p>
        </div>
        <div className="flex gap-2">
          <Button size="icon" variant="ghost">
            <Edit className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
