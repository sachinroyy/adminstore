"use client";

import { useState } from 'react';

import { Divider } from '@mui/material';
import HeroSection from '../../components/herosection/herosection';
import Products from '../../components/products/product';
import Category from '../../components/category/category';
import AdSlider from '../../components/adsslider';
import ImageRow from '../../components/ads/adsthree';
import Deal from '../../components/Dealoftheday/Deal';

export default function Homepage() {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  return (
    <main className="min-h-screen">

      <HeroSection />
      <Divider />
      <Category onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
      <Divider />
      <AdSlider />
      <Divider />
      <Products categoryId={selectedCategory} />
      <Divider />
      <ImageRow />
      <Divider />
      <Deal />

    </main>
  );
}