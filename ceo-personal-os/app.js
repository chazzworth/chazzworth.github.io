// CEO Personal OS - JavaScript

// ============================================================================
// NAVIGATION
// ============================================================================

const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');

function navigateTo(sectionId) {
    sections.forEach(s => s.classList.remove('active'));
    navItems.forEach(n => n.classList.remove('active'));

    const section = document.getElementById(sectionId);
    const navItem = document.querySelector(`[data-section="${sectionId}"]`);

    if (section) section.classList.add('active');
    if (navItem) navItem.classList.add('active');

    window.scrollTo(0, 0);
}

navItems.forEach(item => {
    item.addEventListener('click', () => {
        const section = item.getAttribute('data-section');
        navigateTo(section);
    });
});

// ============================================================================
// DATA STORAGE
// ============================================================================

function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getData(key) {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
}

function getAllData(prefix) {
    const data = [];
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith(prefix)) {
            const item = JSON.parse(localStorage.getItem(key));
            data.push({
                key: key,
                ...item
            });
        }
    }
    return data.sort((a, b) => new Date(b.date || b.year || 0) - new Date(a.date || a.year || 0));
}

function deleteData(key) {
    localStorage.removeItem(key);
}

// ============================================================================
// DAILY CHECK-IN
// ============================================================================

function initDailyCheckin() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('daily-date').value = today;
    loadDailyEntries();
}

function saveDailyCheckin() {
    const date = document.getElementById('daily-date').value;
    const data = {
        date: date,
        energy: document.getElementById('daily-energy').value,
        energyWhy: document.getElementById('daily-energy-why').value,
        win: document.getElementById('daily-win').value,
        friction: document.getElementById('daily-friction').value,
        letgo: document.getElementById('daily-letgo').value,
        priority: document.getElementById('daily-priority').value
    };

    saveData(`daily-${date}`, data);
    alert('Daily check-in saved!');
    clearDailyForm();
    loadDailyEntries();
}

function clearDailyForm() {
    document.getElementById('daily-energy').value = '';
    document.getElementById('daily-energy-why').value = '';
    document.getElementById('daily-win').value = '';
    document.getElementById('daily-friction').value = '';
    document.getElementById('daily-letgo').value = '';
    document.getElementById('daily-priority').value = '';
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('daily-date').value = today;
}

function loadDailyEntries() {
    const entries = getAllData('daily-');
    const container = document.getElementById('daily-entries');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No check-ins yet. Start your first one above!</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="entry-item">
            <div class="entry-content" onclick='viewEntry("${entry.key}")'>
                <div class="entry-date">${entry.date}</div>
                <div class="entry-preview">Energy: ${entry.energy}/10 • ${entry.win.substring(0, 100)}${entry.win.length > 100 ? '...' : ''}</div>
            </div>
            <div class="entry-actions">
                <button class="btn btn-small btn-secondary" onclick='editEntry("${entry.key}", "daily")'>Edit</button>
                <button class="btn btn-small btn-danger" onclick='deleteEntry("${entry.key}", "daily")'>Delete</button>
            </div>
        </div>
    `).join('');
}

// ============================================================================
// WEEKLY REVIEW
// ============================================================================

function saveWeeklyReview() {
    const date = document.getElementById('weekly-date').value;
    if (!date) {
        alert('Please enter the week (e.g., Week 03, 2025)');
        return;
    }

    const data = {
        date: date,
        needle: document.getElementById('weekly-needle').value,
        noise: document.getElementById('weekly-noise').value,
        leak: document.getElementById('weekly-leak').value,
        energy: document.getElementById('weekly-energy').value,
        insight: document.getElementById('weekly-insight').value,
        adjustment: document.getElementById('weekly-adjustment').value
    };

    saveData(`weekly-${date}`, data);
    alert('Weekly review saved!');
    clearWeeklyForm();
    loadWeeklyEntries();
}

function clearWeeklyForm() {
    document.getElementById('weekly-date').value = '';
    document.getElementById('weekly-needle').value = '';
    document.getElementById('weekly-noise').value = '';
    document.getElementById('weekly-leak').value = '';
    document.getElementById('weekly-energy').value = '';
    document.getElementById('weekly-insight').value = '';
    document.getElementById('weekly-adjustment').value = '';
}

function loadWeeklyEntries() {
    const entries = getAllData('weekly-');
    const container = document.getElementById('weekly-entries');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No reviews yet.</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="entry-item">
            <div class="entry-content" onclick='viewEntry("${entry.key}")'>
                <div class="entry-date">${entry.date}</div>
                <div class="entry-preview">${entry.insight.substring(0, 100)}${entry.insight.length > 100 ? '...' : ''}</div>
            </div>
            <div class="entry-actions">
                <button class="btn btn-small btn-secondary" onclick='editEntry("${entry.key}", "weekly")'>Edit</button>
                <button class="btn btn-small btn-danger" onclick='deleteEntry("${entry.key}", "weekly")'>Delete</button>
            </div>
        </div>
    `).join('');
}

// ============================================================================
// QUARTERLY REVIEW
// ============================================================================

function saveQuarterlyReview() {
    const date = document.getElementById('quarterly-date').value;
    if (!date) {
        alert('Please enter the quarter (e.g., Q1 2025)');
        return;
    }

    const data = {
        date: date,
        summary: document.getElementById('quarterly-summary').value,
        goalsProgress: document.getElementById('quarterly-goals-progress').value,
        goalsStalled: document.getElementById('quarterly-goals-stalled').value,
        timeSpent: document.getElementById('quarterly-time-spent').value,
        valueCreated: document.getElementById('quarterly-value-created').value,
        drains: document.getElementById('quarterly-drains').value,
        continue: document.getElementById('quarterly-continue').value,
        stop: document.getElementById('quarterly-stop').value,
        adjustment: document.getElementById('quarterly-adjustment').value,
        insights: document.getElementById('quarterly-insights').value
    };

    saveData(`quarterly-${date}`, data);
    alert('Quarterly review saved!');
    clearQuarterlyForm();
    loadQuarterlyEntries();
}

function clearQuarterlyForm() {
    document.getElementById('quarterly-date').value = '';
    document.getElementById('quarterly-summary').value = '';
    document.getElementById('quarterly-goals-progress').value = '';
    document.getElementById('quarterly-goals-stalled').value = '';
    document.getElementById('quarterly-time-spent').value = '';
    document.getElementById('quarterly-value-created').value = '';
    document.getElementById('quarterly-drains').value = '';
    document.getElementById('quarterly-continue').value = '';
    document.getElementById('quarterly-stop').value = '';
    document.getElementById('quarterly-adjustment').value = '';
    document.getElementById('quarterly-insights').value = '';
}

function loadQuarterlyEntries() {
    const entries = getAllData('quarterly-');
    const container = document.getElementById('quarterly-entries');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No quarterly reviews yet.</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="entry-item">
            <div class="entry-content" onclick='viewEntry("${entry.key}")'>
                <div class="entry-date">${entry.date}</div>
                <div class="entry-preview">${entry.summary.substring(0, 100)}${entry.summary.length > 100 ? '...' : ''}</div>
            </div>
            <div class="entry-actions">
                <button class="btn btn-small btn-secondary" onclick='editEntry("${entry.key}", "quarterly")'>Edit</button>
                <button class="btn btn-small btn-danger" onclick='deleteEntry("${entry.key}", "quarterly")'>Delete</button>
            </div>
        </div>
    `).join('');
}

// ============================================================================
// ANNUAL REVIEW
// ============================================================================

function saveAnnualReview() {
    const year = document.getElementById('annual-year').value;
    if (!year) {
        alert('Please enter the year');
        return;
    }

    const data = {
        year: year,
        date: year,
        summary: document.getElementById('annual-summary').value,
        milestones: document.getElementById('annual-milestones').value,
        proWins: document.getElementById('annual-pro-wins').value,
        personalWins: document.getElementById('annual-personal-wins').value,
        proStruggles: document.getElementById('annual-pro-struggles').value,
        personalStruggles: document.getElementById('annual-personal-struggles').value,
        differently: document.getElementById('annual-differently').value,
        patterns: document.getElementById('annual-patterns').value,
        theme: document.getElementById('annual-theme').value,
        success: document.getElementById('annual-success').value,
        decisions: document.getElementById('annual-decisions').value
    };

    saveData(`annual-${year}`, data);
    alert('Annual review saved!');
    clearAnnualForm();
    loadAnnualEntries();
}

function clearAnnualForm() {
    document.getElementById('annual-year').value = '';
    document.getElementById('annual-summary').value = '';
    document.getElementById('annual-milestones').value = '';
    document.getElementById('annual-pro-wins').value = '';
    document.getElementById('annual-personal-wins').value = '';
    document.getElementById('annual-pro-struggles').value = '';
    document.getElementById('annual-personal-struggles').value = '';
    document.getElementById('annual-differently').value = '';
    document.getElementById('annual-patterns').value = '';
    document.getElementById('annual-theme').value = '';
    document.getElementById('annual-success').value = '';
    document.getElementById('annual-decisions').value = '';
}

function loadAnnualEntries() {
    const entries = getAllData('annual-');
    const container = document.getElementById('annual-entries');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No annual reviews yet.</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="entry-item">
            <div class="entry-content" onclick='viewEntry("${entry.key}")'>
                <div class="entry-date">${entry.year}</div>
                <div class="entry-preview">${entry.summary.substring(0, 100)}${entry.summary.length > 100 ? '...' : ''}</div>
            </div>
            <div class="entry-actions">
                <button class="btn btn-small btn-secondary" onclick='editEntry("${entry.key}", "annual")'>Edit</button>
                <button class="btn btn-small btn-danger" onclick='deleteEntry("${entry.key}", "annual")'>Delete</button>
            </div>
        </div>
    `).join('');
}

// ============================================================================
// INTERVIEWS
// ============================================================================

// Past Year Interview
function saveInterviewPast() {
    const year = document.getElementById('interview-past-year').value;
    if (!year) {
        alert('Please enter the year');
        return;
    }

    const data = {
        year: year,
        date: year,
        opening: document.getElementById('interview-past-opening').value,
        highlights: document.getElementById('interview-past-highlights').value,
        hiddenWin: document.getElementById('interview-past-hidden-win').value,
        lowlights: document.getElementById('interview-past-lowlights').value,
        pattern: document.getElementById('interview-past-pattern').value,
        drains: document.getElementById('interview-past-drains').value,
        energizes: document.getElementById('interview-past-energizes').value,
        repeat: document.getElementById('interview-past-repeat').value,
        lesson: document.getElementById('interview-past-lesson').value,
        advice: document.getElementById('interview-past-advice').value,
        leaveBehind: document.getElementById('interview-past-leave-behind').value
    };

    saveData(`interview-past-${year}`, data);
    alert('Interview saved!');
    loadInterviewPastEntries();
}

function loadInterviewPastEntries() {
    const entries = getAllData('interview-past-');
    const container = document.getElementById('interview-past-entries');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No interviews yet.</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="entry-item">
            <div class="entry-content" onclick='viewEntry("${entry.key}")'>
                <div class="entry-date">${entry.year} Reflection</div>
                <div class="entry-preview">${entry.lesson.substring(0, 100)}</div>
            </div>
            <div class="entry-actions">
                <button class="btn btn-small btn-danger" onclick='deleteEntry("${entry.key}", "interview-past")'>Delete</button>
            </div>
        </div>
    `).join('');
}

// Identity Interview
function saveInterviewIdentity() {
    const timestamp = Date.now();
    const data = {
        date: new Date().toISOString(),
        threeWords: document.getElementById('interview-identity-three-words').value,
        realSelf: document.getElementById('interview-identity-real-self').value,
        performative: document.getElementById('interview-identity-performative').value,
        principles: document.getElementById('interview-identity-principles').value,
        values: document.getElementById('interview-identity-values').value,
        meaningfulWork: document.getElementById('interview-identity-meaningful-work').value,
        impact: document.getElementById('interview-identity-impact').value,
        gap: document.getElementById('interview-identity-gap').value,
        pretending: document.getElementById('interview-identity-pretending').value,
        change: document.getElementById('interview-identity-change').value
    };

    saveData(`interview-identity-${timestamp}`, data);
    alert('Identity interview saved!');
    loadInterviewIdentityEntries();
}

function loadInterviewIdentityEntries() {
    const entries = getAllData('interview-identity-');
    const container = document.getElementById('interview-identity-entries');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No interviews yet.</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="entry-item">
            <div class="entry-content" onclick='viewEntry("${entry.key}")'>
                <div class="entry-date">${new Date(entry.date).toLocaleDateString()}</div>
                <div class="entry-preview">${entry.values.substring(0, 100)}</div>
            </div>
            <div class="entry-actions">
                <button class="btn btn-small btn-danger" onclick='deleteEntry("${entry.key}", "interview-identity")'>Delete</button>
            </div>
        </div>
    `).join('');
}

// Future Self Interview
function saveInterviewFuture() {
    const timestamp = Date.now();
    const data = {
        date: new Date().toISOString(),
        horizon: document.getElementById('interview-future-horizon').value,
        typicalDay: document.getElementById('interview-future-typical-day').value,
        alive: document.getElementById('interview-future-alive').value,
        work: document.getElementById('interview-future-work').value,
        workRelationship: document.getElementById('interview-future-work-relationship').value,
        health: document.getElementById('interview-future-health').value,
        needlessWorry: document.getElementById('interview-future-needless-worry').value,
        keyDecision: document.getElementById('interview-future-key-decision').value,
        stop: document.getElementById('interview-future-stop').value,
        start: document.getElementById('interview-future-start').value,
        advice: document.getElementById('interview-future-advice').value
    };

    saveData(`interview-future-${timestamp}`, data);
    alert('Future self interview saved!');
    loadInterviewFutureEntries();
}

function loadInterviewFutureEntries() {
    const entries = getAllData('interview-future-');
    const container = document.getElementById('interview-future-entries');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No interviews yet.</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="entry-item">
            <div class="entry-content" onclick='viewEntry("${entry.key}")'>
                <div class="entry-date">${entry.horizon} years - ${new Date(entry.date).toLocaleDateString()}</div>
                <div class="entry-preview">${entry.advice.substring(0, 100)}</div>
            </div>
            <div class="entry-actions">
                <button class="btn btn-small btn-danger" onclick='deleteEntry("${entry.key}", "interview-future")'>Delete</button>
            </div>
        </div>
    `).join('');
}

// ============================================================================
// GOALS
// ============================================================================

// 1-Year Goals
function saveGoals1Year() {
    const year = document.getElementById('goals-1yr-year').value;
    if (!year) {
        alert('Please enter the year');
        return;
    }

    const data = {
        year: year,
        date: year,
        theme: document.getElementById('goals-1yr-theme').value,
        pro1: document.getElementById('goals-1yr-pro1').value,
        pro2: document.getElementById('goals-1yr-pro2').value,
        pro3: document.getElementById('goals-1yr-pro3').value,
        health: document.getElementById('goals-1yr-health').value,
        relationships: document.getElementById('goals-1yr-relationships').value,
        learning: document.getElementById('goals-1yr-learning').value,
        sayingNo: document.getElementById('goals-1yr-saying-no').value,
        success: document.getElementById('goals-1yr-success').value
    };

    saveData(`goals-1yr-${year}`, data);
    alert('1-year goals saved!');
    loadGoals1YearEntries();
}

function loadGoals1YearEntries() {
    const entries = getAllData('goals-1yr-');
    const container = document.getElementById('goals-1yr-entries');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No 1-year goals yet.</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="entry-item">
            <div class="entry-content" onclick='viewEntry("${entry.key}")'>
                <div class="entry-date">${entry.year}</div>
                <div class="entry-preview">Theme: ${entry.theme.substring(0, 80)}</div>
            </div>
            <div class="entry-actions">
                <button class="btn btn-small btn-secondary" onclick='editEntry("${entry.key}", "goals-1yr")'>Edit</button>
                <button class="btn btn-small btn-danger" onclick='deleteEntry("${entry.key}", "goals-1yr")'>Delete</button>
            </div>
        </div>
    `).join('');
}

// 3-Year Goals
function saveGoals3Year() {
    const horizon = document.getElementById('goals-3yr-horizon').value;
    if (!horizon) {
        alert('Please enter the time horizon');
        return;
    }

    const data = {
        year: horizon,
        date: horizon,
        bigQuestion: document.getElementById('goals-3yr-big-question').value,
        work: document.getElementById('goals-3yr-work').value,
        milestones: document.getElementById('goals-3yr-milestones').value,
        health: document.getElementById('goals-3yr-health').value,
        relationships: document.getElementById('goals-3yr-relationships').value,
        lifestyle: document.getElementById('goals-3yr-lifestyle').value,
        decisions: document.getElementById('goals-3yr-decisions').value
    };

    saveData(`goals-3yr-${horizon}`, data);
    alert('3-year goals saved!');
    loadGoals3YearEntries();
}

function loadGoals3YearEntries() {
    const entries = getAllData('goals-3yr-');
    const container = document.getElementById('goals-3yr-entries');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No 3-year goals yet.</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="entry-item">
            <div class="entry-content" onclick='viewEntry("${entry.key}")'>
                <div class="entry-date">${entry.year}</div>
                <div class="entry-preview">${entry.bigQuestion.substring(0, 80)}</div>
            </div>
            <div class="entry-actions">
                <button class="btn btn-small btn-secondary" onclick='editEntry("${entry.key}", "goals-3yr")'>Edit</button>
                <button class="btn btn-small btn-danger" onclick='deleteEntry("${entry.key}", "goals-3yr")'>Delete</button>
            </div>
        </div>
    `).join('');
}

// 10-Year Vision
function saveGoals10Year() {
    const horizon = document.getElementById('goals-10yr-horizon').value;
    if (!horizon) {
        alert('Please enter the time horizon');
        return;
    }

    const data = {
        year: horizon,
        date: horizon,
        central: document.getElementById('goals-10yr-central').value,
        work: document.getElementById('goals-10yr-work').value,
        impact: document.getElementById('goals-10yr-impact').value,
        lifestyle: document.getElementById('goals-10yr-lifestyle').value,
        financial: document.getElementById('goals-10yr-financial').value,
        legacy: document.getElementById('goals-10yr-legacy').value,
        regret: document.getElementById('goals-10yr-regret').value
    };

    saveData(`goals-10yr-${horizon}`, data);
    alert('10-year vision saved!');
    loadGoals10YearEntries();
}

function loadGoals10YearEntries() {
    const entries = getAllData('goals-10yr-');
    const container = document.getElementById('goals-10yr-entries');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No 10-year visions yet.</p>';
        return;
    }

    container.innerHTML = entries.map(entry => `
        <div class="entry-item">
            <div class="entry-content" onclick='viewEntry("${entry.key}")'>
                <div class="entry-date">${entry.year}</div>
                <div class="entry-preview">${entry.central.substring(0, 80)}</div>
            </div>
            <div class="entry-actions">
                <button class="btn btn-small btn-secondary" onclick='editEntry("${entry.key}", "goals-10yr")'>Edit</button>
                <button class="btn btn-small btn-danger" onclick='deleteEntry("${entry.key}", "goals-10yr")'>Delete</button>
            </div>
        </div>
    `).join('');
}

// ============================================================================
// NORTH STAR
// ============================================================================

function loadNorthStar() {
    const data = getData('north-star');
    if (data) {
        document.getElementById('north-mission').value = data.mission || '';
        document.getElementById('north-values').value = data.values || '';
        document.getElementById('north-boundaries').value = data.boundaries || '';
        document.getElementById('north-regret').value = data.regret || '';
        document.getElementById('north-energizes').value = data.energizes || '';
        document.getElementById('north-drains').value = data.drains || '';
    }
}

function saveNorthStar() {
    const data = {
        mission: document.getElementById('north-mission').value,
        values: document.getElementById('north-values').value,
        boundaries: document.getElementById('north-boundaries').value,
        regret: document.getElementById('north-regret').value,
        energizes: document.getElementById('north-energizes').value,
        drains: document.getElementById('north-drains').value
    };

    saveData('north-star', data);
    alert('North Star saved!');
}

// ============================================================================
// LIFE MAP
// ============================================================================

const lifeDomains = [
    { id: 'career', name: 'Career', description: 'Your work and professional identity' },
    { id: 'relationships', name: 'Relationships', description: 'Partner, family, close friends' },
    { id: 'health', name: 'Health', description: 'Physical and mental well-being' },
    { id: 'meaning', name: 'Meaning', description: 'Purpose and contribution' },
    { id: 'finances', name: 'Finances', description: 'Earning, saving, security' },
    { id: 'fun', name: 'Fun', description: 'Joy, play, experiences' }
];

function initLifeMap() {
    const chart = document.getElementById('life-map-chart');
    const current = getData('life-map-current') || {};

    chart.innerHTML = lifeDomains.map(domain => {
        const rating = current[domain.id] || 5;
        return `
            <div class="life-map-item">
                <div class="life-map-label">
                    <span><strong>${domain.name}</strong> — ${domain.description}</span>
                    <span id="rating-${domain.id}-value">${rating}/10</span>
                </div>
                <div class="rating-input">
                    ${[1,2,3,4,5,6,7,8,9,10].map(n => `
                        <button class="rating-btn ${n === rating ? 'selected' : ''}"
                                onclick="selectRating('${domain.id}', ${n})"
                                data-domain="${domain.id}"
                                data-rating="${n}">${n}</button>
                    `).join('')}
                </div>
                <div class="life-map-bar">
                    <div class="life-map-fill" id="bar-${domain.id}" style="width: ${rating * 10}%">${rating}</div>
                </div>
            </div>
        `;
    }).join('');

    loadLifeMapHistory();
}

function selectRating(domain, rating) {
    // Update visual
    document.querySelectorAll(`[data-domain="${domain}"]`).forEach(btn => {
        btn.classList.remove('selected');
    });
    document.querySelector(`[data-domain="${domain}"][data-rating="${rating}"]`).classList.add('selected');

    // Update bar
    document.getElementById(`bar-${domain}`).style.width = (rating * 10) + '%';
    document.getElementById(`bar-${domain}`).textContent = rating;
    document.getElementById(`rating-${domain}-value`).textContent = `${rating}/10`;
}

function saveLifeMap() {
    const ratings = {};
    lifeDomains.forEach(domain => {
        const selected = document.querySelector(`[data-domain="${domain.id}"].selected`);
        ratings[domain.id] = selected ? parseInt(selected.dataset.rating) : 5;
    });

    // Save current ratings
    saveData('life-map-current', ratings);

    // Save historical snapshot
    const timestamp = Date.now();
    saveData(`life-map-${timestamp}`, {
        date: new Date().toISOString(),
        ratings: ratings
    });

    alert('Life Map saved!');
    loadLifeMapHistory();
}

function loadLifeMapHistory() {
    const entries = getAllData('life-map-').filter(e => e.key !== 'life-map-current');
    const container = document.getElementById('life-map-history');

    if (entries.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No historical Life Maps yet. Save your first one above!</p>';
        return;
    }

    container.innerHTML = entries.map(entry => {
        const avgRating = Object.values(entry.ratings).reduce((a, b) => a + b, 0) / 6;
        return `
            <div class="card">
                <h4>${new Date(entry.date).toLocaleDateString()}</h4>
                <p style="margin-bottom: 1rem;">Average: ${avgRating.toFixed(1)}/10</p>
                ${lifeDomains.map(domain => `
                    <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                        <span>${domain.name}</span>
                        <span style="color: var(--primary); font-weight: 600;">${entry.ratings[domain.id]}/10</span>
                    </div>
                `).join('')}
            </div>
        `;
    }).join('');
}

// ============================================================================
// PATTERN TRACKING
// ============================================================================

function savePattern() {
    const title = document.getElementById('pattern-title').value;
    if (!title) {
        alert('Please enter a pattern title');
        return;
    }

    const data = {
        date: new Date().toISOString(),
        title: title,
        description: document.getElementById('pattern-description').value,
        cause: document.getElementById('pattern-cause').value,
        action: document.getElementById('pattern-action').value
    };

    const timestamp = Date.now();
    saveData(`pattern-${timestamp}`, data);
    alert('Pattern saved!');
    clearPatternForm();
    loadPatterns();
}

function clearPatternForm() {
    document.getElementById('pattern-title').value = '';
    document.getElementById('pattern-description').value = '';
    document.getElementById('pattern-cause').value = '';
    document.getElementById('pattern-action').value = '';
}

function loadPatterns() {
    const patterns = getAllData('pattern-');
    const container = document.getElementById('pattern-entries');

    if (patterns.length === 0) {
        container.innerHTML = '<p style="color: var(--text-muted);">No patterns tracked yet.</p>';
        return;
    }

    container.innerHTML = patterns.map(pattern => `
        <div class="card">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 0.5rem;">
                <h4 style="margin: 0;">${pattern.title}</h4>
                <button class="btn btn-small btn-danger" onclick='deletePattern("${pattern.key}")'>Delete</button>
            </div>
            <p><strong>Description:</strong> ${pattern.description}</p>
            ${pattern.cause ? `<p><strong>Root Cause:</strong> ${pattern.cause}</p>` : ''}
            ${pattern.action ? `<p><strong>Next Action:</strong> ${pattern.action}</p>` : ''}
            <p style="color: var(--text-muted); font-size: 0.875rem; margin-top: 0.5rem;">${new Date(pattern.date).toLocaleDateString()}</p>
        </div>
    `).join('');
}

function deletePattern(key) {
    if (confirm('Are you sure you want to delete this pattern?')) {
        deleteData(key);
        loadPatterns();
    }
}

// ============================================================================
// ENTRY VIEWING, EDITING, DELETING
// ============================================================================

function viewEntry(key) {
    const data = getData(key);
    if (!data) return;

    const modal = document.getElementById('entry-modal');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');

    title.textContent = data.date || data.year || 'Entry';

    let content = '<div>';
    Object.keys(data).forEach(k => {
        if (k !== 'key' && k !== 'date' && k !== 'year') {
            const label = k.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
            content += `<div style="margin-bottom: 1.5rem;">
                <strong style="color: var(--primary);">${label}:</strong>
                <p style="margin-top: 0.5rem; white-space: pre-wrap;">${data[k] || '—'}</p>
            </div>`;
        }
    });
    content += '</div>';

    body.innerHTML = content;
    modal.classList.add('active');
}

function editEntry(key, type) {
    const data = getData(key);
    if (!data) return;

    // Navigate to the appropriate section
    navigateTo(type);

    // Populate form fields
    setTimeout(() => {
        Object.keys(data).forEach(k => {
            const field = document.getElementById(`${type}-${k}`);
            if (field) {
                field.value = data[k] || '';
            }
        });
    }, 100);
}

function deleteEntry(key, type) {
    if (confirm('Are you sure you want to delete this entry?')) {
        deleteData(key);

        // Reload appropriate entries list
        switch(type) {
            case 'daily': loadDailyEntries(); break;
            case 'weekly': loadWeeklyEntries(); break;
            case 'quarterly': loadQuarterlyEntries(); break;
            case 'annual': loadAnnualEntries(); break;
            case 'interview-past': loadInterviewPastEntries(); break;
            case 'interview-identity': loadInterviewIdentityEntries(); break;
            case 'interview-future': loadInterviewFutureEntries(); break;
            case 'goals-1yr': loadGoals1YearEntries(); break;
            case 'goals-3yr': loadGoals3YearEntries(); break;
            case 'goals-10yr': loadGoals10YearEntries(); break;
        }
    }
}

function closeModal() {
    document.getElementById('entry-modal').classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('entry-modal').addEventListener('click', (e) => {
    if (e.target.id === 'entry-modal') {
        closeModal();
    }
});

// ============================================================================
// EXPORT / IMPORT / CLEAR
// ============================================================================

function exportData() {
    const allData = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        allData[key] = localStorage.getItem(key);
    }

    const dataStr = JSON.stringify(allData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ceo-os-backup-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = e => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = event => {
            try {
                const data = JSON.parse(event.target.result);
                Object.keys(data).forEach(key => {
                    localStorage.setItem(key, data[key]);
                });
                alert('Data imported successfully!');
                location.reload();
            } catch (err) {
                alert('Error importing data: ' + err.message);
            }
        };
        reader.readAsText(file);
    };
    input.click();
}

function clearAllData() {
    if (confirm('WARNING: This will delete ALL your data. This cannot be undone. Are you absolutely sure?')) {
        if (confirm('Last chance - really delete everything?')) {
            localStorage.clear();
            alert('All data cleared.');
            location.reload();
        }
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

window.addEventListener('DOMContentLoaded', () => {
    initDailyCheckin();
    loadWeeklyEntries();
    loadQuarterlyEntries();
    loadAnnualEntries();
    loadNorthStar();
    initLifeMap();
    loadPatterns();
    loadInterviewPastEntries();
    loadInterviewIdentityEntries();
    loadInterviewFutureEntries();
    loadGoals1YearEntries();
    loadGoals3YearEntries();
    loadGoals10YearEntries();
});
