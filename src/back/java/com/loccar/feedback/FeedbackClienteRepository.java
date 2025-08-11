package com.loccar.feedback;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FeedbackClienteRepository extends JpaRepository<FeedbackCliente, Long> {
    List<FeedbackCliente> findByClienteId(Long clienteId);
    List<FeedbackCliente> findByContratoId(Long contratoId);
}
