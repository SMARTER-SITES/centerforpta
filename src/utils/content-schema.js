// Explicit contributor IDs keep bilingual names independent of entity identity.
const origin = 'https://centerforpta.com';
export const clinicianId = `${origin}/dr-jelena-djurovic/#person`;

export function getContributor(id, displayName) {
  if (id === 'jelena-djurovic') {
    return {
      '@type': 'Person', '@id': clinicianId,
      name: 'Jelena Djurovic', alternateName: 'Jelena Đurović',
      honorificPrefix: 'Dr.', honorificSuffix: 'Psy.D.',
      url: `${origin}/dr-jelena-djurovic/`
    };
  }
  if (id === 'center-for-pta') {
    return {
      '@type': 'Organization', '@id': `${origin}/#professional-service`,
      name: 'Center for PTA', url: origin
    };
  }
  if (id) throw new Error(`Unknown contributor ID: ${id}`);
  return displayName ? { '@type': 'Person', name: displayName } : undefined;
}

export function getReviewMetadata(reviewerId, displayName, date) {
  if (date && !reviewerId) throw new Error('A review date requires an identified reviewer');
  if (date && (!/^\d{4}-\d{2}-\d{2}$/.test(date) ||
      Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date)) {
    throw new Error(`Review dates require a verified calendar date: ${date}`);
  }
  return {
    ...(reviewerId ? { reviewedBy: getContributor(reviewerId, displayName) } : {}),
    ...(date ? { lastReviewed: date } : {})
  };
}

export function getTranslationMetadata(language, alternatePath) {
  if (!alternatePath) return {};
  if (!alternatePath.startsWith('/') || alternatePath.startsWith('//')) {
    throw new Error('Translation must use a verified local counterpart');
  }
  const key = language === 'sr' ? 'translationOfWork' : 'workTranslation';
  return { [key]: { '@id': `${origin}${alternatePath}#article` } };
}
