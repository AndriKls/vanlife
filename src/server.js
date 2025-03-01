import { createServer, Model, Response } from "miragejs"


createServer({
    models: {
        vans: Model,
        reviews: Model,
    },

    seeds(server) {
        server.create("van", { id: "1", name: "Modest Explorer", price: 60, description: "The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/modest-explorer.png", type: "simple", hostId: "123" })
        server.create("van", { id: "2", name: "Beach Bum", price: 80, description: "Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/beach-bum.png", type: "rugged", hostId: "123" })
        server.create("van", { id: "3", name: "Reliable Red", price: 100, description: "Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/reliable-red.png", type: "luxury", hostId: "456" })
        server.create("van", { id: "4", name: "Dreamfinder", price: 65, description: "Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/dreamfinder.png", type: "simple", hostId: "789" })
        server.create("van", { id: "5", name: "The Cruiser", price: 120, description: "The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/the-cruiser.png", type: "luxury", hostId: "789" })
        server.create("van", { id: "6", name: "Green Wonder", price: 70, description: "With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.", imageUrl: "https://assets.scrimba.com/advanced-react/react-router/green-wonder.png", type: "rugged", hostId: "123" })
        
        // Add some sample reviews
        server.create("review", { id: "1", vanId: "1", userName: "John Doe", rating: 5, text: "Amazing van! Had a great weekend getaway.", date: "2023-05-15" })
        server.create("review", { id: "2", vanId: "1", userName: "Sarah Smith", rating: 4, text: "Very comfortable, but a bit pricey.", date: "2023-06-20" })
        server.create("review", { id: "3", vanId: "2", userName: "Mike Johnson", rating: 5, text: "Perfect for beach trips! Loved every minute.", date: "2023-04-10" })
        server.create("review", { id: "4", vanId: "3", userName: "Emma Wilson", rating: 3, text: "Nice van but had some issues with the kitchen area.", date: "2023-07-05" })
        server.create("review", { id: "5", vanId: "5", userName: "Robert Brown", rating: 5, text: "Pure luxury! Worth every penny.", date: "2023-08-12" })
    },

    routes() {
        this.namespace = "api"
        this.logging = false

        this.get("/vans", (schema, request) => {
            return schema.vans.all()
        })

        this.get("/vans/:id", (schema, request) => {
            const id = request.params.id
            return schema.vans.find(id)
        })

        this.get("/host/vans", (schema, request) => {
            // Hard-code the hostId for now
            return schema.vans.where({ hostId: "123" })
        })

        this.get("/host/vans/:id", (schema, request) => {
            // Hard-code the hostId for now
            const id = request.params.id
            return schema.vans.findBy({ id, hostId: "123" })
        })
        
        // Get reviews for a specific van
        this.get("/vans/:id/reviews", (schema, request) => {
            const vanId = request.params.id
            return schema.reviews.where({ vanId })
        })
        
        // Add a new review
        this.post("/vans/:id/reviews", (schema, request) => {
            const vanId = request.params.id
            const body = JSON.parse(request.requestBody)
            
            const newReview = {
                ...body,
                vanId,
                id: new Date().getTime().toString(),
                date: new Date().toISOString().split('T')[0]
            }
            
            return schema.reviews.create(newReview)
        })
    }
})