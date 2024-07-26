
```
coderHouse_backend
├─ .dockerignore
├─ .gitignore
├─ .env.example
├─ .env.dev
├─ .env.test
├─ .env.prod
├─ Dockerfile
├─ logs
│  ├─ dev.log
│  └─ prod.log
├─ package-lock.json
├─ package.json
├─ src
│  ├─ app.js
│  ├─ configs
│  │  ├─ handlebars.config.js
│  │  ├─ logger.config.js
│  │  ├─ mercadopago.config.js
│  │  ├─ passport.config.js
│  │  ├─ swagger.config.js
│  │  ├─ switch.config.js
│  │  ├─ test.config.js
│  │  └─ transport.config.js
│  ├─ controllers
│  │  ├─ authentication.controller.js
│  │  ├─ carts.controller.js
│  │  ├─ chats.controller.js
│  │  ├─ products.controller.js
│  │  ├─ ticket.controller.js
│  │  └─ users.controller.js
│  ├─ dao
│  │  ├─ factory.js
│  │  └─ mongoDB
│  │     ├─ cartManager.js
│  │     ├─ chatManager.js
│  │     ├─ productManager.js
│  │     ├─ ticketManager.js
│  │     └─ userManager.js
│  ├─ databases
│  │  └─ mongo.js
│  ├─ docs
│  │  ├─ carts
│  │  │  └─ carts.yaml
│  │  └─ products
│  │     └─ products.yaml
│  ├─ dto
│  │  └─ profile.dto.js
│  ├─ helpers
│  │  ├─ commander.js
│  │  ├─ errors
│  │  │  ├─ custom-error.js
│  │  │  ├─ enum.js
│  │  │  └─ info.js
│  │  ├─ middlewares.js
│  │  ├─ socket.js
│  │  └─ utils.js
│  ├─ jobs
│  │  └─ deleteInactiveUsers.js
│  ├─ models
│  │  ├─ cart.model.js
│  │  ├─ message.model.js
│  │  ├─ product.model.js
│  │  ├─ ticket.model.js
│  │  └─ user.model.js
│  ├─ public
│  │  ├─ assets
│  │  │  └─ img
│  │  │     └─ favico.png
│  │  ├─ css
│  │  │  └─ index.css
│  │  └─ js
│  │     ├─ cart.js
│  │     ├─ chat.js
│  │     ├─ detail.js
│  │     ├─ list.js
│  │     └─ main.js
│  ├─ routes
│  │  ├─ index.js
│  │  ├─ persistence
│  │  │  ├─ authentication.routes.js
│  │  │  ├─ carts.routes.js
│  │  │  ├─ chats.routes.js
│  │  │  ├─ products.routes.js
│  │  │  ├─ ticket.routes.js
│  │  │  └─ users.routes.js
│  │  └─ views
│  │     ├─ authentication.view.js
│  │     ├─ cart.view.js
│  │     ├─ chat.view.js
│  │     ├─ page404.view.js
│  │     ├─ products.view.js
│  │     └─ productsAdmin.view.js
│  ├─ services
│  │  ├─ cart.service.js
│  │  ├─ chat.service.js
│  │  ├─ product.service.js
│  │  ├─ ticket.service.js
│  │  └─ user.service.js
│  ├─ uploads
│  │  ├─ documents
│  │  ├─ products
│  │  └─ profiles
│  └─ views
│     ├─ admin-panel.handlebars
│     ├─ afterResetRequest.handlebars
│     ├─ cart.handlebars
│     ├─ chat.handlebars
│     ├─ emailSend.handlebars
│     ├─ layouts
│     │  └─ main.handlebars
│     ├─ login.handlebars
│     ├─ page404.handlebars
│     ├─ partials
│     │  ├─ card.handlebars
│     │  ├─ cards.handlebars
│     │  ├─ footer.handlebars
│     │  ├─ form-create.handlebars
│     │  ├─ form-delete.handlebars
│     │  ├─ form-login.handlebars
│     │  ├─ form-register.handlebars
│     │  ├─ form-resetRequest.handlebars
│     │  ├─ form-resetWithLoggedUser.handlebars
│     │  ├─ form-resetWithoutLoggedUser.handlebars
│     │  ├─ navbar.handlebars
│     │  ├─ panel.handlebars
│     │  ├─ productDetail.handlebars
│     │  ├─ table.handlebars
│     │  ├─ user-data.handlebars
│     │  └─ window.handlebars
│     ├─ product.handlebars
│     ├─ products.handlebars
│     ├─ productsAdmin.handlebars
│     ├─ profile.handlebars
│     ├─ purchase.handlebars
│     ├─ register.handlebars
│     ├─ reset.handlebars
│     └─ resetRequest.handlebars
└─ testing
   ├─ supertest
   │  ├─ authentication.super.test.js
   │  └─ products.super.test.js
   └─ test
      ├─ carts.test.js
      ├─ products.test.js
      └─ users.test.js

```