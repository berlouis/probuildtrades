export function trackRenovationInterest(projectType) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'renovation_interest', {
      event_category,
      event_label,
    });
  }
}
