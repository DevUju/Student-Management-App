import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './students.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const existing = await this.studentRepository.findOneBy({
      email: createStudentDto.email,
    });

    if (existing) {
      throw new ConflictException(
        `A student with email "${createStudentDto.email}" already exists`,
      );
    }

    const student = this.studentRepository.create(createStudentDto);

    return await this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOneBy({ id });
    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }
    return student;
  }

  async update(
    id: number,
    updateStudentDto: UpdateStudentDto,
  ): Promise<Student> {
    const student = await this.findOne(id);

    Object.assign(student, updateStudentDto);

    return await this.studentRepository.save(student);
  }

  async remove(id: number): Promise<{ message: string }> {
    await this.findOne(id);
    await this.studentRepository.delete(id);
    return { message: `Student ${id} successfully deleted` };
  }
}
