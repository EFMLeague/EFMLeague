"use client";
import React, { useState } from "react";
import { COUNTRIES } from "@/app/utils/temp/countries";

const CountryList: React.FC = () => {
  const [filter, setFilter] = useState<string>(""); // Stato per il valore dell'input

  const filteredCountries = COUNTRIES.filter((country) =>
    country.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h1>Elenco delle città</h1>
      <input
        type="text"
        placeholder="Filtra le città"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <ul className="text-white">
        {filteredCountries.map((country, index) => (
          <li key={index}>{country.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountryList;
