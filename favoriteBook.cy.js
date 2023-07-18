const bookFirst = {
  title: "Экипаж'",
  description:
    "Когда-то их списали за воздушное хуллиганство, но теперь им предстоит вернуться и покорить небо Сирии.",
  author: "Вадим Захароов",
};

const bookSecond = {
  title: "По лезвию ножа",
  description:
    "Им надоело стрелять, но это единственное, что они умеют делать хорошо. Рано или поздно команда «К бою!» раздастся снова…",
  author: "Олег Дивов",
};

const bookThird = {
  title: "Выживший",
  description:
    "После авиакатастрофы он попал в ледяную пустошь, сможет ли он выбраться из этого ада?",
  author: "Майкл Кавинский",
};

describe("Favorite book spec", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.login("test@test.com", "test");
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