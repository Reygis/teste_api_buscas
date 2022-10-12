import { University } from '../entities/Universities';
import { AppDataSource } from '../data-source'

export const universitiesRepository = AppDataSource.getRepository(University)