import { Book as BookIcon, Calendar, FileText, Tag } from 'lucide-react';
import { Book } from './BooksPage';

interface BookCardProps {
  book: Book;
  onClick: () => void;
}

export function BookCard({ book, onClick }: BookCardProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 text-left group hover:-translate-y-1 border border-gray-100 cursor-pointer"
    >
      {/* Book Icon Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
          <BookIcon className="w-6 h-6 text-blue-600" />
        </div>
        <div className="bg-gray-50 px-3 py-1 rounded-full">
          <span className="text-xs font-medium text-gray-600">{book.category}</span>
        </div>
      </div>

      {/* Title and Author */}
      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
        {book.title}
      </h3>
      <p className="text-gray-600 mb-4 text-sm">{book.author}</p>

      {/* Book Details */}
      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{book.year}</span>
        </div>
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4" />
          <span>{book.pageCount} pages</span>
        </div>
      </div>

      {/* Hover Indicator */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <span className="text-sm text-blue-600 font-medium group-hover:underline">
          View Details →
        </span>
      </div>
    </button>
  );
}
