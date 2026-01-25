import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  X,
  Calendar,
  FileText,
  Tag,
  User,
  Edit2,
  Trash2,
  Save,
  ArrowLeftFromLineIcon,
  ThumbsUpIcon,
} from "lucide-react";
import { useState } from "react";
import { Book } from "./BooksPage";

interface BookModalProps {
  bookId: number;
  onClose: () => void;
}

async function fetchBookById(id: number): Promise<Book> {
  const response = await fetch(`http://localhost:8080/api/books/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch book details");
  }
  return response.json();
}

async function updateBook(book: Book): Promise<Book> {
  const response = await fetch(`http://localhost:8080/api/books/${book.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(book),
  });
  if (!response.ok) {
    throw new Error("Failed to update book");
  }
  return response.json();
}

async function updateBookAvailability(bookId: any): Promise<Book> {
  const response = await fetch(
    `http://localhost:8080/api/books/${bookId}/availability`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  if (!response.ok) {
    throw new Error("Failed to update book");
  }
  return response.json();
}

async function deleteBook(id: number): Promise<void> {
  const response = await fetch(`http://localhost:8080/api/books/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete book");
  }
}

export function BookModal({ bookId, onClose }: BookModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedBook, setEditedBook] = useState<Book | null>(null);
  const queryClient = useQueryClient();

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book", bookId],
    queryFn: () => fetchBookById(bookId),
  });

  const updateMutation = useMutation({
    mutationFn: updateBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book", bookId] });
      setIsEditing(false);
    },
  });

  const updateAvailabilityMutation = useMutation({
    mutationFn: updateBookAvailability,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      queryClient.invalidateQueries({ queryKey: ["book", bookId] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBook,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["books"] });
      onClose();
    },
  });

  const handleEdit = () => {
    if (book) {
      setEditedBook({ ...book });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    if (editedBook) {
      updateMutation.mutate(editedBook);
    }
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      deleteMutation.mutate(bookId);
    }
  };

  const handleAvailability = () => {
    updateAvailabilityMutation.mutate(bookId);
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900">Book Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-600">
              Error loading book details
            </div>
          )}

          {book && !isEditing && (
            <div className="space-y-6">
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">
                  {book.title}
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-50 p-2 rounded-lg">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Author</p>
                    <p className="font-semibold text-gray-900">{book.author}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-green-50 p-2 rounded-lg">
                    <Calendar className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Publication Year</p>
                    <p className="font-semibold text-gray-900">{book.year}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-purple-50 p-2 rounded-lg">
                    <Tag className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold text-gray-900">
                      {book.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="bg-orange-50 p-2 rounded-lg">
                    <FileText className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Page Count</p>
                    <p className="font-semibold text-gray-900">
                      {book.pageCount} pages
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 justify-between pt-6 border-t border-gray-200">
                <button
                  onClick={handleEdit}
                  className="flex flex-1 items-center justify-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium cursor-pointer"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit Book
                </button>
                <button
                  onClick={handleDelete}
                  disabled={deleteMutation.isPending}
                  className="flex flex-1 items-center justify-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-lg hover:bg-red-100 transition-colors font-medium disabled:opacity-50 cursor-pointer"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
                <button
                  onClick={handleAvailability}
                  disabled={updateAvailabilityMutation.isPending}
                  className="flex flex-1 items-center justify-center gap-2 px-4 py-3 rounded-lg transition-colors font-medium cursor-pointer"
                  style={{
                    color: book.isAvailable ? "#16a34a" : "#ea580c",
                    backgroundColor: book.isAvailable ? "#d1fae5" : "#ffedd5",
                  }}
                  title={book.isAvailable ? "Click to rent out" : "Click to return"}
                >
                  {book.isAvailable ? (
                    <>
                      Rent Book Out
                      <ThumbsUpIcon className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      Return Book
                      <ArrowLeftFromLineIcon className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {isEditing && editedBook && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={editedBook.title}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, title: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={editedBook.author}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, author: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year
                  </label>
                  <input
                    type="number"
                    value={editedBook.year}
                    onChange={(e) =>
                      setEditedBook({
                        ...editedBook,
                        year: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Page Count
                  </label>
                  <input
                    type="number"
                    value={editedBook.pageCount}
                    onChange={(e) =>
                      setEditedBook({
                        ...editedBook,
                        pageCount: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category
                </label>
                <input
                  type="text"
                  value={editedBook.category}
                  onChange={(e) =>
                    setEditedBook({ ...editedBook, category: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Edit Action Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={updateMutation.isPending}
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50"
                >
                  <Save className="w-4 h-4" />
                  {updateMutation.isPending ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditedBook(null);
                  }}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
              </div>

              {updateMutation.isError && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-600 text-sm">
                  Failed to update book. Please try again.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
