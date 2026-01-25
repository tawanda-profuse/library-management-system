import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { BookOpen, Plus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BookCard } from './BookCard';
import { BookModal } from './BookModal';
import { AddBookModal } from './AddBookModal';

export interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  category: string;
  pageCount: number;
}

async function fetchBooks(): Promise<Book[]> {
  const response = await fetch('http://localhost:8080/api/books');
  if (!response.ok) {
    throw new Error('Failed to fetch books');
  }
  return response.json();
}

export function BooksPage() {
  const navigate = useNavigate();
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const { data: books, isLoading, error } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                title="Back to home"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-blue-600" />
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Book Collection</h1>
                  <p className="text-sm text-gray-500">
                    {books ? `${books.length} book${books.length !== 1 ? 's' : ''}` : 'Loading...'}
                  </p>
                </div>
              </div>
            </div>
            
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg cursor-pointer"
            >
              <Plus className="w-5 h-5" />
              Add Book
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {isLoading && (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading books...</p>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 font-semibold mb-2">Error loading books</p>
            <p className="text-red-500 text-sm">
              {error instanceof Error ? error.message : 'An error occurred'}
            </p>
            <p className="text-gray-600 text-sm mt-2">
              Make sure the API server is running on http://localhost:8080
            </p>
          </div>
        )}

        {books && books.length === 0 && (
          <div className="text-center py-20">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No books yet</h3>
            <p className="text-gray-500 mb-6">Get started by adding your first book</p>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Your First Book
            </button>
          </div>
        )}

        {books && books.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onClick={() => setSelectedBookId(book.id)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Modals */}
      {selectedBookId && (
        <BookModal
          bookId={selectedBookId}
          onClose={() => setSelectedBookId(null)}
        />
      )}

      {isAddModalOpen && (
        <AddBookModal onClose={() => setIsAddModalOpen(false)} />
      )}
    </div>
  );
}
