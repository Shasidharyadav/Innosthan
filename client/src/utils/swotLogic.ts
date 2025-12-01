export type TimeHorizon = 'short_term' | 'medium_term' | 'long_term'
export type SwotQuadrant = 'strength' | 'weakness' | 'opportunity' | 'threat'

export interface SwotItem {
  id: string
  quadrant: SwotQuadrant
  text: string
  priority: 1 | 2 | 3 | 4 | 5
  timeHorizon: TimeHorizon
  createdAt: number
}

export interface SwotVersion {
  timestamp: number
  state: SwotState
}

export interface SwotState {
  title: string
  description: string
  items: SwotItem[]
  versionHistory: SwotVersion[]
}

export interface SwotIntelligenceResult {
  score: number
  level: 'Basic' | 'Moderate' | 'Strong' | 'Strategic'
  breakdown: {
    quantity: number
    balance: number
    coverage: number
    priorityUse: number
    specificity: number
    consistency: number
  }
}

// Pure state mutators
export function addItem(state: SwotState, quadrant: SwotQuadrant, text: string): SwotState {
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  const item: SwotItem = {
    id,
    quadrant,
    text: text.trim(),
    priority: 3,
    timeHorizon: 'medium_term',
    createdAt: Date.now()
  }
  return { ...state, items: [...state.items, item] }
}

export function updateItemText(state: SwotState, id: string, text: string): SwotState {
  return {
    ...state,
    items: state.items.map(i => (i.id === id ? { ...i, text: text.trim() } : i))
  }
}

export function updatePriority(state: SwotState, id: string, priority: 1 | 2 | 3 | 4 | 5): SwotState {
  return {
    ...state,
    items: state.items.map(i => (i.id === id ? { ...i, priority } : i))
  }
}

export function updateTimeHorizon(state: SwotState, id: string, timeHorizon: TimeHorizon): SwotState {
  return {
    ...state,
    items: state.items.map(i => (i.id === id ? { ...i, timeHorizon } : i))
  }
}

export function deleteItem(state: SwotState, id: string): SwotState {
  return { ...state, items: state.items.filter(i => i.id !== id) }
}

// Helper utilities
function clamp(n: number, a = 0, b = 100) {
  return Math.max(a, Math.min(b, n))
}

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[\p{P}$+<=>^`|~]/gu, ' ')
    .split(/\s+/)
    .filter(Boolean)
}

function jaccard(a: string[], b: string[]) {
  const setA = new Set(a)
  const setB = new Set(b)
  const inter = [...setA].filter(x => setB.has(x)).length
  const union = new Set([...setA, ...setB]).size
  if (union === 0) return 0
  return inter / union
}

// Evaluation
export function evaluateSwot(items: SwotItem[]): SwotIntelligenceResult {
  // breakdown fields
  let quantity = 0
  let balance = 0
  let coverage = 0
  let priorityUse = 0
  let specificity = 0
  let consistency = 0

  // Quantity: up to 12 items => 20 points
  const totalItems = items.length
  quantity = (Math.min(totalItems, 12) / 12) * 20

  // Balance: internal vs external and strengths vs weaknesses (max 20)
  const strengths = items.filter(i => i.quadrant === 'strength')
  const weaknesses = items.filter(i => i.quadrant === 'weakness')
  const opportunities = items.filter(i => i.quadrant === 'opportunity')
  const threats = items.filter(i => i.quadrant === 'threat')

  const internal = strengths.length + weaknesses.length
  const external = opportunities.length + threats.length
  let internalExternalScore = 0
  if (internal + external > 0) {
    const minv = Math.min(internal, external)
    const maxv = Math.max(internal, external)
    internalExternalScore = maxv === 0 ? 0 : (minv / maxv) * 10
  }

  let strWeakScore = 0
  if (strengths.length + weaknesses.length > 0) {
    const minv = Math.min(strengths.length, weaknesses.length)
    const maxv = Math.max(strengths.length, weaknesses.length)
    strWeakScore = maxv === 0 ? 0 : (minv / maxv) * 10
  }

  balance = internalExternalScore + strWeakScore // max 20

  // Coverage: 5 points if each quadrant >=1, +5 if each quadrant >=3
  const quadrants = [strengths, weaknesses, opportunities, threats]
  const hasEach = quadrants.every(q => q.length >= 1)
  const hasEach3 = quadrants.every(q => q.length >= 3)
  coverage = (hasEach ? 5 : 0) + (hasEach3 ? 5 : 0)

  // Priority-use scoring
  const uniquePriorities = new Set(items.map(i => i.priority))
  const upc = uniquePriorities.size
  if (upc <= 1 && items.length > 0) priorityUse = 4
  else if (upc === 2) priorityUse = 12
  else if (upc >= 3) priorityUse = 20
  else priorityUse = 0

  // Specificity: per-item scoring up to 20 total (average)
  const genericPhrases = ['lots', 'many', 'various', 'some', 'several', 'etc', 'etc.', 'big market', 'good', 'bad', 'lack of']
  const perItemScores = items.map(it => {
    const words = tokenize(it.text)
    const wordCount = words.length
    let score = Math.min(wordCount / 20, 1) * 12 // up to 12
    // numbers / percentages bonus
    if (/[0-9]+%|\b\d+\b/.test(it.text)) score += 4
    // generic penalties
    const low = genericPhrases.some(p => it.text.toLowerCase().includes(p))
    if (low) score = Math.max(0, score - 3)
    return clamp(score, 0, 20)
  })
  specificity = perItemScores.length > 0 ? perItemScores.reduce((a, b) => a + b, 0) / perItemScores.length : 0

  // Consistency: start at 10, subtract 2 per detected conflict
  let conflicts = 0
  // Strength vs Weakness conflicts
  for (const s of strengths) {
    const stokens = tokenize(s.text)
    for (const w of weaknesses) {
      const wtokens = tokenize(w.text)
      const sim = jaccard(stokens, wtokens)
      if (sim > 0.6) conflicts += 1
    }
  }
  // Opportunity vs Threat conflicts
  for (const o of opportunities) {
    const otokens = tokenize(o.text)
    for (const t of threats) {
      const ttokens = tokenize(t.text)
      const sim = jaccard(otokens, ttokens)
      if (sim > 0.6) conflicts += 1
    }
  }
  consistency = Math.max(0, 10 - conflicts * 2)

  // Sum up breakdown
  const breakdown = {
    quantity: clamp(Math.round(quantity)),
    balance: clamp(Math.round(balance)),
    coverage: clamp(Math.round(coverage)),
    priorityUse: clamp(Math.round(priorityUse)),
    specificity: clamp(Math.round(specificity)),
    consistency: clamp(Math.round(consistency))
  }

  const rawScore = breakdown.quantity + breakdown.balance + breakdown.coverage + breakdown.priorityUse + breakdown.specificity + breakdown.consistency
  const score = clamp(Math.round(rawScore))

  let level: SwotIntelligenceResult['level'] = 'Basic'
  if (score >= 80) level = 'Strategic'
  else if (score >= 60) level = 'Strong'
  else if (score >= 40) level = 'Moderate'
  else level = 'Basic'

  return { score, level, breakdown }
}

export function generateInsights(result: SwotIntelligenceResult): string[] {
  const txts: string[] = []
  const b = result.breakdown

  if (b.quantity < 10) txts.push('Add more items — aim for at least 8–12 total points to capture breadth.')
  if (b.coverage < 5) txts.push('Fill missing quadrants or add items so each quadrant has at least one point.')
  if (b.balance < 10) txts.push('Balance internal vs external factors and ensure strengths/weaknesses are aligned in number.')
  if (b.specificity < 10) txts.push('Make items more specific: add evidence, numbers, timeframes, or measurable claims.')
  if (b.priorityUse < 12) txts.push('Diversify priority levels across items to better reflect importance.')
  if (b.consistency < 8) txts.push('Resolve contradictions between Strengths vs Weaknesses or Opportunities vs Threats.')
  if (result.score >= 80) txts.push('Your SWOT is strategic — focus on translating insights into action plans.')
  if (txts.length === 0) txts.push('No specific recommendations — maintain this level of detail and keep updating versions.')
  return txts
}

export function saveVersion(state: SwotState): SwotVersion {
  const snapshot = JSON.parse(JSON.stringify(state)) as SwotState
  const v: SwotVersion = { timestamp: Date.now(), state: snapshot }
  return v
}

// Export utilities
export function exportStateToJSON(state: SwotState, comparison?: SwotComparison | null): string {
  const output: any = { ...state }
  if (comparison) {
    output._changeHistory = {
      exportedAt: new Date().toISOString(),
      comparison: {
        totalPrevious: comparison.totalPrev,
        totalCurrent: comparison.totalCurr,
        addedCount: Object.values(comparison.added).reduce((s: number, arr: any[]) => s + arr.length, 0),
        removedCount: Object.values(comparison.removed).reduce((s: number, arr: any[]) => s + arr.length, 0),
        modifiedCount: comparison.modified.length,
        deltas: comparison.deltaCounts,
        addedSamples: Object.keys(comparison.added).reduce((acc: Record<string, string[]>, q: string) => {
          const sample = comparison.added[q as keyof typeof comparison.added].slice(0, 2).map((it: any) => it.text)
          if (sample.length > 0) acc[q] = sample
          return acc
        }, {}),
        removedSamples: Object.keys(comparison.removed).reduce((acc: Record<string, string[]>, q: string) => {
          const sample = comparison.removed[q as keyof typeof comparison.removed].slice(0, 2).map((it: any) => it.text)
          if (sample.length > 0) acc[q] = sample
          return acc
        }, {}),
        modifiedSamples: comparison.modified.slice(0, 3).map(m => ({
          quadrant: m.quadrant,
          before: m.before?.text || '',
          after: m.after?.text || ''
        }))
      }
    }
  }
  return JSON.stringify(output, null, 2)
}

export function exportItemsToCSV(items: SwotItem[], comparison?: SwotComparison | null): string {
  const rows: string[] = []
  
  // Add change summary header if comparison provided
  if (comparison) {
    const totalAdded = Object.values(comparison.added).reduce((s: number, arr: any[]) => s + arr.length, 0)
    const totalRemoved = Object.values(comparison.removed).reduce((s: number, arr: any[]) => s + arr.length, 0)
    rows.push('# CHANGE HISTORY')
    rows.push(`# Exported at: ${new Date().toISOString()}`)
    rows.push(`# Total Items (Previous): ${comparison.totalPrev}`)
    rows.push(`# Total Items (Current): ${comparison.totalCurr}`)
    rows.push(`# Total Added: ${totalAdded}`)
    rows.push(`# Total Removed: ${totalRemoved}`)
    rows.push(`# Total Modified: ${comparison.modified.length}`)
    rows.push('')
    
    // Delta per quadrant
    rows.push('# DELTAS BY QUADRANT')
    rows.push('# Quadrant,Delta')
    Object.entries(comparison.deltaCounts).forEach(([q, delta]: [string, number]) => {
      rows.push(`# ${q},${delta >= 0 ? '+' + delta : delta}`)
    })
    rows.push('')
    
    // Added items
    if (totalAdded > 0) {
      rows.push('# ADDED ITEMS')
      Object.entries(comparison.added).forEach(([q, items]: [string, any[]]) => {
        if (items.length > 0) {
          items.forEach(it => {
            rows.push(`# [${q}] ${(it.text || '').replace(/"/g, '""')}`)
          })
        }
      })
      rows.push('')
    }
    
    // Removed items
    if (totalRemoved > 0) {
      rows.push('# REMOVED ITEMS')
      Object.entries(comparison.removed).forEach(([q, items]: [string, any[]]) => {
        if (items.length > 0) {
          items.forEach(it => {
            rows.push(`# [${q}] ${(it.text || '').replace(/"/g, '""')}`)
          })
        }
      })
      rows.push('')
    }
    
    // Modified items
    if (comparison.modified.length > 0) {
      rows.push('# MODIFIED ITEMS')
      comparison.modified.forEach(m => {
        rows.push(`# [${m.quadrant}] Before: ${(m.before?.text || '').replace(/"/g, '""')}`)
        rows.push(`# [${m.quadrant}] After: ${(m.after?.text || '').replace(/"/g, '""')}`)
      })
      rows.push('')
    }
  }
  
  // Current items data
  rows.push('# CURRENT SWOT ITEMS')
  const headers = ['id', 'quadrant', 'text', 'priority', 'timeHorizon', 'createdAt']
  rows.push(headers.join(','))
  items.forEach(i => {
    const cols = [i.id, i.quadrant, `"${(i.text || '').replace(/"/g, '""')}"`, String(i.priority), i.timeHorizon, String(i.createdAt)]
    rows.push(cols.join(','))
  })
  
  return rows.join('\n')
}

export type SwotComparison = {
  totalPrev: number
  totalCurr: number
  countsPrev: Record<string, number>
  countsCurr: Record<string, number>
  deltaCounts: Record<string, number>
  added: Record<string, SwotItem[]>
  removed: Record<string, SwotItem[]>
  modified: Array<{ id?: string; quadrant: string; before: Partial<SwotItem> | null; after: Partial<SwotItem> | null }>
}

// Compare two frontend-style SWOT shapes (plural quadrant arrays)
export function compareSwotAnalyses(prev: any | null, curr: any): SwotComparison {
  const quadrants = ['strengths', 'weaknesses', 'opportunities', 'threats']
  const countsPrev: Record<string, number> = {}
  const countsCurr: Record<string, number> = {}
  const deltaCounts: Record<string, number> = {}
  const added: Record<string, SwotItem[]> = { strengths: [], weaknesses: [], opportunities: [], threats: [] }
  const removed: Record<string, SwotItem[]> = { strengths: [], weaknesses: [], opportunities: [], threats: [] }
  const modified: Array<{ id?: string; quadrant: string; before: Partial<SwotItem> | null; after: Partial<SwotItem> | null }> = []

  quadrants.forEach((q) => {
    const prevArr = (prev && prev[q]) || []
    const currArr = (curr && curr[q]) || []
    countsPrev[q] = prevArr.length
    countsCurr[q] = currArr.length
    deltaCounts[q] = countsCurr[q] - countsPrev[q]

    // Build maps by id if available, else by text
    const mapPrevById: Record<string, SwotItem> = {}
    const mapPrevByText: Record<string, SwotItem> = {}
    prevArr.forEach((it: any) => {
      if (it.id) mapPrevById[String(it.id)] = it
      else mapPrevByText[String((it.text || '').trim())] = it
    })

    const seenPrev = new Set<string>()

    currArr.forEach((it: any) => {
      const keyById = it.id ? String(it.id) : null
      const keyByText = String((it.text || '').trim())

      let matchedPrev: SwotItem | undefined
      if (keyById && mapPrevById[keyById]) {
        matchedPrev = mapPrevById[keyById]
        seenPrev.add(keyById)
      } else if (mapPrevByText[keyByText]) {
        matchedPrev = mapPrevByText[keyByText]
        seenPrev.add(keyByText)
      }

      if (!matchedPrev) {
        // new item
        added[q].push(it)
      } else {
        // check for modifications
        const beforeText = (matchedPrev.text || '').trim()
        const afterText = (it.text || '').trim()
        if (beforeText !== afterText || (matchedPrev.priority && it.priority && matchedPrev.priority !== it.priority)) {
          modified.push({ id: it.id, quadrant: q, before: matchedPrev, after: it })
        }
      }
    })

    // any prev not seen are removed
    prevArr.forEach((it: any) => {
      const key = it.id ? String(it.id) : String((it.text || '').trim())
      if (!seenPrev.has(key)) removed[q].push(it)
    })
  })

  const totalPrev = quadrants.reduce((s, q) => s + countsPrev[q], 0)
  const totalCurr = quadrants.reduce((s, q) => s + countsCurr[q], 0)

  return { totalPrev, totalCurr, countsPrev, countsCurr, deltaCounts, added, removed, modified }
}
