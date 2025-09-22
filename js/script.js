// js/livro.js
// Lê ?id= do URL e popula a página com dados dos livros

function getQueryParam(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

document.addEventListener('DOMContentLoaded', () => {
  const id = Number(getQueryParam('id')) || 1;
  const book = BOOKS.find(b => b.id === id);
  if (!book) {
    document.body.innerHTML = '<p>Livro não encontrado.</p>';
    return;
  }

  // Preencher elementos
  document.getElementById('capa-livro').src = book.coverLarge || book.cover;
  document.getElementById('capa-livro').alt = book.title;
  document.getElementById('titulo-livro').textContent = book.title;
  const linkAutor = document.getElementById('link-autor');
  linkAutor.textContent = book.author;
  linkAutor.href = `autor.html?name=${encodeURIComponent(book.author)}`;

  // Sinopse escrita
  document.getElementById('sinopse-text').textContent = book.synopsis;

  // Áudio
  const src = document.getElementById('sinopse-src');
  src.src = book.audio || '';
  const audio = document.getElementById('sinopse-audio');
  audio.load();

  // Detalhes
  const detalhes = document.getElementById('detalhes-list');
  detalhes.innerHTML = `
    <li><b>Ano de publicação:</b> ${book.year}</li>
    <li><b>Gênero:</b> <a href="genero.html?id=${book.genre.id}">${book.genre.name}</a></li>
  `;

  // Avaliações
  const aval = document.getElementById('avaliacoes');
  aval.textContent = `${'★'.repeat(Math.round(book.rating))} (${book.rating.toFixed(1)}) - ${book.reviews} avaliações`;
});
