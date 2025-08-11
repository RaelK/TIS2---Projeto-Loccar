package com.loccar.vistoria;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface VistoriaRepository extends JpaRepository<Vistoria, Long> {
    List<Vistoria> findByFuncionarioId(Long funcionarioId);
}