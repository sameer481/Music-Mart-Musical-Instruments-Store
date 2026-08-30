import React, { useState } from 'react';
import './CustomerReviews.css';
import { Star, CheckCircle, MessageSquare, Plus, X, ThumbsUp } from 'lucide-react';
import { REVIEWS_MOCK } from '../data/products';

export default function CustomerReviews() {
  const [reviews, setReviews] = useState(REVIEWS_MOCK);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newReview, setNewReview] = useState({
    name: '',
    rating: 5,
    instrument: '',
    comment: ''
  });

  const handleAddReview = (e) => {
    e.preventDefault();
    if (!newReview.name || !newReview.comment) return;
    const reviewObj = {
      id: Date.now(),
      name: newReview.name,
      rating: Number(newReview.rating),
      date: 'Just now',
      comment: newReview.comment,
      verified: true,
      instrument: newReview.instrument || 'MusicMart Purchase'
    };
    setReviews([reviewObj, ...reviews]);
    setShowReviewModal(false);
    setNewReview({ name: '', rating: 5, instrument: '', comment: '' });
  };

  return (
    <section className="py-16 bg-slate-950/80 border-t border-slate-800">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1 text-xs font-bold text-pink-400 uppercase tracking-widest mb-1">
              <Star className="w-3.5 h-3.5 fill-pink-400" />
              <span>Musician Testimonials</span>
            </div>
            <h2 className="text-3xl font-extrabold text-slate-100 font-heading">
              Loved by Musicians Worldwide
            </h2>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="btn-secondary text-xs py-2.5 px-5 flex items-center gap-2 border-purple-500/40 text-purple-300"
          >
            <Plus className="w-4 h-4" />
            <span>Write a Musician Review</span>
          </button>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((rev) => (
            <div key={rev.id} className="glass-panel p-6 space-y-4 border-slate-800/80 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[11px] text-slate-400">{rev.date}</span>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed italic">"{rev.comment}"</p>
              </div>

              <div className="pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-extrabold text-slate-100">{rev.name}</h4>
                  <p className="text-[10px] text-purple-400 font-semibold">{rev.instrument}</p>
                </div>
                {rev.verified && (
                  <span className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    <CheckCircle className="w-3 h-3" />
                    <span>Verified Buyer</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Modal for adding review */}
        {showReviewModal && (
          <div className="overlay">
            <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 w-full max-w-md relative space-y-4">
              <button onClick={() => setShowReviewModal(false)} className="absolute top-4 right-4 btn-icon">
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-pink-400" />
                <h3 className="text-xl font-bold text-white font-heading">Write Customer Review</h3>
              </div>

              <form onSubmit={handleAddReview} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-slate-400">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Eddie Van Halen"
                    value={newReview.name}
                    onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400">Instrument Purchased</label>
                  <input
                    type="text"
                    placeholder="e.g. Fender Stratocaster"
                    value={newReview.instrument}
                    onChange={(e) => setNewReview({ ...newReview, instrument: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400">Rating (1 to 5 Stars)</label>
                  <select
                    value={newReview.rating}
                    onChange={(e) => setNewReview({ ...newReview, rating: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1"
                  >
                    <option value="5">5 Stars ★★★★★</option>
                    <option value="4">4 Stars ★★★★☆</option>
                    <option value="3">3 Stars ★★★☆☆</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400">Your Review</label>
                  <textarea
                    required
                    rows="3"
                    placeholder="Describe tone quality, build finish, shipping speed..."
                    value={newReview.comment}
                    onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-100 mt-1"
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full py-2.5 justify-center text-xs font-bold mt-2">
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
