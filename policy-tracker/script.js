// Initialize policies from local storage or use sample data
let policies = JSON.parse(localStorage.getItem('policies')) || [
  {
    id: "1",
    title: "Healthcare Accessibility Act",
    description: "Expands healthcare access to underserved communities through increased funding for rural clinics and telehealth services.",
    status: "introduced",
    category: "healthcare",
    introducedDate: "2023-02-15",
    lastUpdated: "2023-03-01",
    sponsors: ["Sen. John Smith", "Rep. Maria Garcia"],
    isNew: false // Add isNew flag for existing policies
  },
  {
    id: "2",
    title: "Education Reform Bill",
    description: "Provides additional funding for public schools in low-income areas and establishes new standards for teacher certification.",
    status: "committee",
    category: "education",
    introducedDate: "2023-01-10",
    lastUpdated: "2023-03-15",
    sponsors: ["Rep. James Johnson", "Sen. Lisa Brown"],
    isNew: false
  },
  {
    id: "3",
    title: "Clean Energy Initiative",
    description: "Sets targets for renewable energy adoption and provides tax incentives for businesses transitioning to clean energy solutions.",
    status: "passed",
    category: "environment",
    introducedDate: "2022-11-05",
    lastUpdated: "2023-02-20",
    sponsors: ["Sen. Robert Davis", "Rep. Emily Wilson"],
    isNew: false
  },
  {
    id: "4",
    title: "Small Business Relief Act",
    description: "Provides tax breaks and low-interest loans to small businesses affected by economic downturns.",
    status: "enacted",
    category: "economy",
    introducedDate: "2022-09-20",
    lastUpdated: "2023-01-15",
    sponsors: ["Rep. Michael Thompson", "Sen. Sarah Martinez"],
    isNew: false
  },
  {
    id: "5",
    title: "Infrastructure Modernization Plan",
    description: "Allocates funds for repairing roads, bridges, and upgrading public transportation systems in urban areas.",
    status: "introduced",
    category: "infrastructure",
    introducedDate: "2023-03-01",
    lastUpdated: "2023-03-10",
    sponsors: ["Sen. Thomas Wilson", "Rep. Jennifer Lee"],
    isNew: false
  },
  {
    id: "6",
    title: "Digital Privacy Protection Act",
    description: "Establishes new regulations for how companies can collect, store, and use consumer data.",
    status: "committee",
    category: "technology",
    introducedDate: "2023-02-10",
    lastUpdated: "2023-03-05",
    sponsors: ["Rep. David Anderson", "Sen. Patricia Clark"],
    isNew: false
  },
  {
    id: "7",
    title: "National Security Enhancement Act",
    description: "Increases funding for cybersecurity initiatives and establishes a new framework for international intelligence cooperation.",
    status: "failed",
    category: "security",
    introducedDate: "2022-10-15",
    lastUpdated: "2023-01-20",
    sponsors: ["Sen. Christopher Wright", "Rep. Elizabeth Turner"],
    isNew: false
  },
  {
    id: "8",
    title: "Preventive Healthcare Act",
    description: "Expands coverage for preventive care services under public and private health insurance plans.",
    status: "passed",
    category: "healthcare",
    introducedDate: "2022-08-30",
    lastUpdated: "2023-02-10",
    sponsors: ["Rep. Andrew Mitchell", "Sen. Jessica Roberts"],
    isNew: false
  },
  {
    id: "9",
    title: "Renewable Energy Tax Credit",
    description: "Extends and expands tax credits for residential and commercial renewable energy installations.",
    status: "enacted",
    category: "environment",
    introducedDate: "2022-07-20",
    lastUpdated: "2022-12-15",
    sponsors: ["Sen. Rebecca Nelson", "Rep. Kevin Adams"],
    isNew: false
  }
];

// Ensure all loaded policies have isNew flag
policies = policies.map(policy => ({ ...policy, isNew: policy.isNew || false }));

document.addEventListener('DOMContentLoaded', function () {
  // DOM elements
  const policyList = document.getElementById('policy-list');
  const emptyState = document.getElementById('empty-state');
  const searchInput = document.getElementById('search-input');
  const statusFilter = document.getElementById('status-filter');
  const categoryFilter = document.getElementById('category-filter');
  const resetFiltersBtn = document.getElementById('reset-filters');
  const resetEmptyStateBtn = document.getElementById('reset-empty-state');
  const policyCount = document.getElementById('policy-count');

  const addPolicyBtn = document.getElementById('add-policy-btn');
  const modal = document.getElementById('policy-modal');
  const savePolicyBtn = document.getElementById('save-policy-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');

  // Initialize the policy list
  renderPolicies(policies);

  // Event listeners
  searchInput.addEventListener('input', applyFilters);
  statusFilter.addEventListener('change', applyFilters);
  categoryFilter.addEventListener('change', applyFilters);
  resetFiltersBtn.addEventListener('click', resetFilters);
  resetEmptyStateBtn.addEventListener('click', resetFilters);

  addPolicyBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
  });

  closeModalBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
    clearModalInputs();
  });

  savePolicyBtn.addEventListener('click', () => {
    const title = document.getElementById('policy-title').value.trim();
    const description = document.getElementById('policy-description').value.trim();
    const status = document.getElementById('policy-status').value;
    const category = document.getElementById('policy-category').value;
    const sponsors = document.getElementById('policy-sponsors').value
      .split(',')
      .map(s => s.trim())
      .filter(s => s !== '');

    if (!title || !description || sponsors.length === 0) {
      alert("Please fill all fields.");
      return;
    }

    const existing = policies.find(p => p.title.toLowerCase() === title.toLowerCase());

    if (existing) {
      // Update existing policy
      existing.description = description;
      existing.status = status;
      existing.category = category;
      existing.sponsors = sponsors;
      existing.lastUpdated = new Date().toISOString();
      // Do not change isNew status
    } else {
      // Add new policy with isNew: true
      policies.push({
        id: (policies.length + 1).toString(),
        title,
        description,
        status,
        category,
        sponsors,
        introducedDate: new Date().toISOString(),
        lastUpdated: new Date().toISOString(),
        isNew: true // Mark as new
      });
    }

    // Save policies to local storage
    localStorage.setItem('policies', JSON.stringify(policies));

    modal.classList.add('hidden');
    clearModalInputs();
    renderPolicies(policies);
  });

  // Functions
  function clearModalInputs() {
    document.getElementById('policy-title').value = '';
    document.getElementById('policy-description').value = '';
    document.getElementById('policy-status').value = 'introduced';
    document.getElementById('policy-category').value = 'healthcare';
    document.getElementById('policy-sponsors').value = '';
  }

  function renderPolicies(policiesToRender) {
    policyList.innerHTML = '';
    policyCount.textContent = `Showing ${policiesToRender.length} policies`;

    if (policiesToRender.length === 0) {
      policyList.classList.add('hidden');
      emptyState.classList.remove('hidden');
      return;
    }

    policyList.classList.remove('hidden');
    emptyState.classList.add('hidden');

    policiesToRender.forEach(policy => {
      const card = createPolicyCard(policy);
      policyList.appendChild(card);
    });
  }

  function createPolicyCard(policy) {
    const card = document.createElement('div');
    card.className = 'policy-card';

    const formattedIntroducedDate = formatDate(policy.introducedDate);
    const formattedLastUpdated = formatDate(policy.lastUpdated);

    // Conditionally include delete button only for new policies
    const deleteButtonHtml = policy.isNew
      ? `<button class="delete-policy-btn" data-id="${policy.id}">Delete</button>`
      : '';

    card.innerHTML = `
      <div class="policy-header">
        <h4>${policy.title}</h4>
        <div class="policy-meta">
          <span class="policy-status status-${policy.status}">${capitalizeFirstLetter(policy.status)}</span>
          <span class="policy-date">Updated: ${formattedLastUpdated}</span>
        </div>
      </div>
      <div class="policy-content">
        <p class="policy-description">${policy.description}</p>
        <span class="policy-category">${capitalizeFirstLetter(policy.category)}</span>
      </div>
      <div class="policy-footer">
        <div class="policy-sponsors">
          <small>Sponsored by: ${policy.sponsors.join(', ')}</small>
        </div>
        <div class="policy-date">
          <small>Introduced: ${formattedIntroducedDate}</small>
        </div>
        ${deleteButtonHtml}
      </div>
    `;

    // Add event listener for delete button if it exists
    if (policy.isNew) {
      card.querySelector('.delete-policy-btn').addEventListener('click', () => {
        if (confirm(`Are you sure you want to delete "${policy.title}"?`)) {
          deletePolicy(policy.id);
        }
      });
    }

    return card;
  }

  function deletePolicy(policyId) {
    // Remove policy from array
    policies = policies.filter(policy => policy.id !== policyId);
    // Update local storage
    localStorage.setItem('policies', JSON.stringify(policies));
    // Re-render policies
    renderPolicies(policies);
  }

  function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;
    const categoryValue = categoryFilter.value;

    const filtered = policies.filter(policy => {
      const matchesSearch = searchTerm === '' || policy.title.toLowerCase().includes(searchTerm) || policy.description.toLowerCase().includes(searchTerm);
      const matchesStatus = statusValue === 'all' || policy.status === statusValue;
      const matchesCategory = categoryValue === 'all' || policy.category === categoryValue;
      return matchesSearch && matchesStatus && matchesCategory;
    });

    renderPolicies(filtered);
  }

  function resetFilters() {
    searchInput.value = '';
    statusFilter.value = 'all';
    categoryFilter.value = 'all';
    renderPolicies(policies);
  }

  function formatDate(dateString) {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  }

  function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
});