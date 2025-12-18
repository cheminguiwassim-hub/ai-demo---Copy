"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ai-mongo-backend/src/routes/ridesRoutes.ts
const express_1 = __importDefault(require("express"));
const ridesController_1 = require("../controllers/ridesController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get('/', ridesController_1.listRides); // public search/list
router.get('/:id', ridesController_1.getRide); // public get
router.post('/', authMiddleware_1.authMiddleware, ridesController_1.createRide); // create ride (driver)
router.put('/:id', authMiddleware_1.authMiddleware, ridesController_1.updateRide); // edit ride (driver)
router.delete('/:id', authMiddleware_1.authMiddleware, ridesController_1.deleteRide); // delete ride (driver)
router.post('/:id/book', authMiddleware_1.authMiddleware, ridesController_1.bookRide); // booking (user)
exports.default = router;
