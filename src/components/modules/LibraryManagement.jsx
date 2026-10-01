import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { BookMarked, Search, CheckCircle, Clock, BookOpen, User } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import { EmptyState } from '../ui/EmptyState';

export const LibraryManagement = () => {
  const { books, toggleBookCheckout } = useData();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredBooks = books.filter(b => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.isbn.includes(searchQuery);
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const handleCheckoutToggle = (book) => {
    toggleBookCheckout(book.id);
    const action = book.available > 0 ? "issued out" : "returned";
    addToast(`Book "${book.title}" ${action}`, 'success', 'Library Action Logged');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <BookMarked className="w-7 h-7 text-indigo-600 dark:text-indigo-400" />
            <span>Campus Digital Library Catalog</span>
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Search textbook inventory, check out physical copies, and manage library loans.
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
            <div className="sm:col-span-8 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search books by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              />
            </div>
            <div className="sm:col-span-4">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200"
              >
                <option value="All">All Categories</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Electrical">Electrical</option>
                <option value="Business">Business</option>
                <option value="Biotechnology">Biotechnology</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <Card key={book.id} hover>
            <CardHeader>
              <div>
                <Badge variant="indigo" size="sm">{book.category}</Badge>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1 line-clamp-1">{book.title}</h3>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <p className="text-slate-600 dark:text-slate-300 font-medium">
                Author: <span className="font-semibold text-slate-800 dark:text-slate-200">{book.author}</span>
              </p>
              <p className="text-[11px] text-slate-400 font-mono">ISBN: {book.isbn}</p>

              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200/60 dark:border-slate-700 flex items-center justify-between">
                <span className="text-slate-500 font-semibold">Availability:</span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400">{book.available} / {book.totalCopies} Copies Left</span>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <Badge variant={book.status === 'Available' ? 'emerald' : book.status === 'Low Stock' ? 'amber' : 'rose'} size="sm">
                  {book.status}
                </Badge>
                <Button
                  variant={book.available > 0 ? "primary" : "secondary"}
                  size="sm"
                  onClick={() => handleCheckoutToggle(book)}
                >
                  {book.available > 0 ? "Issue Book" : "Return Copy"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
