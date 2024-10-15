"use client";

import ItemThumbnail from "@/components/ItemThumbnail";
import {useEffect, useState} from "react";
import {Item} from "@/models/Item";
import {getAllItems} from "@/services/item.data";

export default function Home() {
    const [items, setItems] = useState<Item[]>([]);

    const getItems = async () => {
        await getAllItems().then(async res => {
            const data = await res.json() as Item[];
            setItems(data);
        });
    }

    useEffect(() => {
        void getItems();
    }, [])

  return (
    <div className="thumbnail-container">
        {items.map(item => (
            <ItemThumbnail key={item.id} item={item} />
        ))}
    </div>
  );
}
