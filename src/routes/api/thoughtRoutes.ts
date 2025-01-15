import { Router } from 'express';
const router = Router();

import { getThoughts, getSingleThought, createThought, updateThought, deleteThought, addReaction, removeReaction} from '../../controllers/thoughtController.js';

// /api/users
router.route('/').get(getThoughts).post(createThought);

router
    .route('/:userId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

// /api/thoughts/:thoughtId/reactions

router.route('/:thoughtId/reactions').post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionID
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

export { router as thoughtRoutes }
