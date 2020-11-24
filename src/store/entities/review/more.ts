import Entity from '../entity'
import ProjectLocationDetailed from './projectLocationDetailed'


export default class ReviewList extends Entity<number> {
    projectLocationDetailed: ProjectLocationDetailed[];
    projectPlanDetailed: object;
}

