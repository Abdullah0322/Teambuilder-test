"use client";
import { useState } from "react";
import { BannerDataTypes, ProductsTypes } from "../app/page";
import FooterBanner from "../comps/FooterBanner";
import MainBanner from "./MainBanner";
import Products from "../app/Products";

interface HomeProps {
  products: ProductsTypes[];
  bannerData: BannerDataTypes[];
}

const Home = ({ products, bannerData }: HomeProps) => {
  const [sortOption, setSortOption] = useState("low-to-high");

  const sortedProducts = [...products].sort((a, b) => {
    if (sortOption === "low-to-high") {
      return a.price - b.price; // Sort from low to high
    } else {
      return b.price - a.price; // Sort from high to low
    }
  });

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };

  return (
    <main>
      {/* === MAIN BANNER  */}
      <MainBanner banner={bannerData[0]} />

      <section className="mb-4 flex items-center flex-col">
        <h1 className="headTitle px-8 py-4 sm:py-2 sm:text-4xl text-2xl text-secondary font-sans font-extrabold sm:rounded-t-3xl">
          Best Selling Headphones
        </h1>
      </section>

      {/* === SORTING SELECT */}
      <section className="mb-4 px-8">
        <label htmlFor="sort-by" className="text-base text-secondary mr-2">
          Sort by price:
        </label>
        <select
          id="sort-by"
          value={sortOption}
          onChange={handleSortChange}
          className="border rounded-lg px-4 py-2 text-base text-secondary"
        >
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </section>

      {/* === SHOW PRODUCTS */}
      <section className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:mx-20 overflow-hidden">
        {/* === MAP PRODUCTS */}
        {sortedProducts?.map((product: ProductsTypes) => {
          return <Products key={product._id} products={product} />;
        })}
      </section>

      {/* ==== FOOTER BANNER */}
      <FooterBanner bannerData={bannerData && bannerData[1]} />
    </main>
  );
};

export default Home;
