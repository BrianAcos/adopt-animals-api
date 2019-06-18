import Promise from 'bluebird';
import L from '../../common/logger'
import IAnimal from '../../repository/IAnimal';
import animalsRepository, { getNextId } from '../../repository/Animals';

export class AnimalService {
  all(): Promise<IAnimal[]> {
    L.info(animalsRepository, 'fetch all animals');
    return Promise.resolve(animalsRepository);
  }

  byId(id: number): Promise<IAnimal> {
    L.info(`fetch animal with id ${id}`);
    return Promise.resolve(animalsRepository.find(a => a.id === id));
  }

  create(animal: Omit<IAnimal, 'id'>): Promise<IAnimal> {
    L.info(`create animal with name ${animal.name}`);
    const newAnimal: IAnimal = {
      id: getNextId(),
      name: (animal.name) ? animal.name : null,
      birthdate: new Date(animal.birthdate),
      breed: animal.breed,
      gender: animal.gender,
      type: animal.type,
      image: (animal.image) ? animal.image : null,
      eyesColor: animal.eyesColor,
      peltColor: animal.peltColor,
      zone: animal.zone,
      description: animal.description,
      contact: {
        email: animal.contact.email,
        name: animal.contact.name,
        phone: animal.contact.phone
      }
    };
    animalsRepository.push(newAnimal)
    return Promise.resolve(newAnimal);
  }
}

export default new AnimalService();
