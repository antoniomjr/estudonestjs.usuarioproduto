import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsuarioEntity } from './usuario.entity';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(UsuarioEntity)
    private readonly usuarioRepository: Repository<UsuarioEntity>,
  ) {}

  async create(usuario: UsuarioEntity) {
    await this.usuarioRepository.save(usuario);
  }

  async findAll(): Promise<ListaUsuarioDTO[]> {
    const users = await this.usuarioRepository.find();
    const usersDTOList = users.map(
      (user) => new ListaUsuarioDTO(user.id, user.nome),
    );
    return usersDTOList;
  }

  async findById(id: string) {
    return await this.usuarioRepository.findOne({ where: { id } });
  }

  async update(id: string, usuario: AtualizaUsuarioDTO) {
    await this.usuarioRepository.update(id, usuario);
  }

  async delete(id: string) {
    await this.usuarioRepository.delete(id);
  }
}
