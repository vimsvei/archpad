export type DirectoryItem = {
  id: string;
  code: string;
  name: string;
  description?: string;
  color?: string;
  order?: number;
  byDefault?: boolean; // New field for default selection
  createdAt?: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
  // Relations to other directories
  relations?: DirectoryRelation[];
};

export type DirectoryRelation = {
  id: string;
  targetDirectoryName: string;
  targetItemName: string;
  relationType: string; // e.g., 'uses', 'has', 'depends'
};

export type Directory = {
  id: string;
  code: string;
  name: string;
  description?: string;
  category: 'architecture' | 'classification' | 'reference';
  items: DirectoryItem[];
};

export type DirectoryCategory = {
  id: string;
  name: string;
  directories: Directory[];
};