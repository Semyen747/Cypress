const bookFirst = {
  title: "Экипаж",
  description:
    "Лучшие летуны на свете",
  author: "Васильев",
};

const bookSecond = {
  title: "Властелин колец",
  description:
    "Хоббит Бильбо Бэггинс, главный герой повести «Хоббит», достигнув почтенного возраста 111 лет, уходит на покой и оставляет племяннику Фродо волшебное кольцо, делающее всякого своего носителя невидимым.",
  author: "Дж. Р. Р. Толкин",
};

const bookThird = {
  title: "Гордость и предубеждение",
  description:
    "Роман начинается с беседы мистера и миссис Беннет о приезде молодого мистера Бингли в Незерфилд-парк.",
  author: "Джейн Остин",
};

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/")
  })
  it("Should successfully login", () => {
   cy.visit("localhost:3000");
   cy.contains('Log in').click();
   cy.get("#mail").type("test@test.com");
   cy.get("#pass").type("test");
   cy.contains("Submit").click();
   cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });
  

  // it("Valid login", () => {
  //   cy.contains("test@test.com").should("be.visible");
  //   cy.contains("Add new").should("have.class", "btn");
  // });

  it("Should add new book", () => {
    cy.addBook(bookFirst);
    cy.get(".card-title").should("contain.text", bookFirst.title);
  });

  it("Should add new book to favorite", () => {
    cy.addFavoriteBook(bookSecond);
    cy.visit("/favorites");
    cy.get(".card-title").should("contain.text", bookSecond.title);
  });

  it("Should add book to favorite through 'Book list' page", () => {
    cy.addBookNoFavorite(bookFirst);
    cy.contains(bookFirst.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.visit("/favorites");
    cy.contains(bookFirst.title).should("be.visible");
  });

  it("Should delete book from favorite", () => {
    cy.visit("/favorites");
    cy.contains(bookSecond.title)
      .should("be.visible")
      .within(() => cy.get(".card-footer > .btn").click({ force: true }));
    cy.contains(bookSecond.title).should("not.exist");
  });
});
