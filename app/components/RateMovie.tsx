'use client';

import { useState } from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { postMovieRating } from '@/app/actions/tmdb';

interface RatingStarsProps {
  movieId: string;
}

const RatingStars = ({ movieId }: RatingStarsProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleRatingSubmit = async (value: number) => {
    setError(null);
    setLoading(true);
    setSuccess(false);

    try {
      await postMovieRating(movieId, value);
      setRating(value);
      setSuccess(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message || 'Failed to submit rating.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-start">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6, 8, 9, 10].map((star) => (
          <button
            key={star}
            type="button"
            className="focus:outline-none"
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => handleRatingSubmit(star)}
            disabled={loading}
          >
            {star <= (hover || rating) ? (
              <AiFillStar size={24} className="text-yellow-500" />
            ) : (
              <AiOutlineStar size={24} className="text-gray-400" />
            )}
          </button>
        ))}
      </div>
      {loading && <p className="text-blue-500 mt-2">Submitting your rating...</p>}
      {error && <p className="text-red-500 mt-2">{error}</p>}
      {success && <p className="text-green-500 mt-2">Rating submitted successfully!</p>}
    </div>
  );
};

export default RatingStars;