export function createRating(rating) {
    const normalizedRating = Math.min(5, Math.max(0, rating));
    const percentage = (normalizedRating / 5) * 100;
    const ratingContainer = document.createElement("div");
    ratingContainer.className = "rating";
    ratingContainer.setAttribute("aria-label", "評価 " + normalizedRating.toFixed(1) + " / 5");
    const stars = document.createElement("div");
    stars.className = "rating-stars";
    const baseStars = document.createElement("div");
    baseStars.className = "rating-stars-base";
    const filledStars = document.createElement("div");
    filledStars.className = "rating-stars-filled";
    filledStars.style.width = percentage + "%";
    for (let i = 0; i < 5; i++) {
        const baseStar = document.createElement("span");
        baseStar.className = "rating-star";
        baseStars.appendChild(baseStar);
        const filledStar = document.createElement("span");
        filledStar.className = "rating-star";
        filledStars.appendChild(filledStar);
    }
    stars.append(baseStars, filledStars);
    const score = document.createElement("data");
    score.className = "rating-score";
    score.value = normalizedRating.toString();
    score.textContent = normalizedRating.toFixed(1);
    ratingContainer.append(stars, score);
    return ratingContainer;
}
