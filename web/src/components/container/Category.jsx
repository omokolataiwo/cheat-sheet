import React from 'react';
import Cheat from './Cheat';

const Category = ({ category, onAddToFavorite }) => {
  let { cheats } = category;
  cheats = cheats || [];
  if (!cheats.length) {
    return null;
  }

  return (
    <section className="category-section">
      <h5>{category.title}</h5>
      <div>
        {cheats.map(cheat => (
          <Cheat cheat={cheat} onAddToFavorite={onAddToFavorite} showActionBar />
        ))}
      </div>
    </section>
  );
};

export default Category;
