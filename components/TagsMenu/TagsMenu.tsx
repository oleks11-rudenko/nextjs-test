'use client';

import { useState } from 'react';
import Link from 'next/link';
import { tags } from '@/lib/api';
import css from './TagsMenu.module.css';

export default function TagsMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div className={css.menuContainer}>
      <button onClick={toggle} className={css.menuButton}>
        Notes {isOpen ? '▴' : '▾'}
      </button>
      {isOpen && (
        <ul className={css.menuList}>
          <li className={css.menuItem}>
            <Link href={`/notes/filter/all`} onClick={toggle} className={css.menuLink}>
              All
            </Link>
          </li>
          {tags.map((tag) => (
            <li key={tag} className={css.menuItem}>
              <Link href={`/notes/filter/${tag}`} onClick={toggle} className={css.menuLink}>
                {tag}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
