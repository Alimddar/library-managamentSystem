import Author from "../models/author.js";

// Create a new author
export const createAuthor = async (req, res) => {
  try {
    const { name, birthYear } = req.body;
    const newAuthor = await Author.create({ name, birthYear });
    res.status(201).json(newAuthor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all authors
export const getAllAuthors = async (req, res) => {
  try {
    const authors = await Author.findAll();
    res.status(200).json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get a single author by ID
export const getAuthorById = async (req, res) => {
  try {
    const author = await Author.findByPk(req.params.id);
    if (author) {
      res.status(200).json(author);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an author
export const updateAuthor = async (req, res) => {
  try {
    const { name, birthYear } = req.body;
    const [updated] = await Author.update({ name, birthYear }, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAuthor = await Author.findByPk(req.params.id);
      res.status(200).json(updatedAuthor);
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete an author
export const deleteAuthor = async (req, res) => {
  try {
    const deleted = await Author.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: "Author not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};