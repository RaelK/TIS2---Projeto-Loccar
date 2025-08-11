package com.loccar.vistoria;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vistorias")
@CrossOrigin(origins = "*")
public class VistoriaController {

    @Autowired
    private VistoriaService vistoriaService; // Changed field name to match usage

    @GetMapping
    public List<Vistoria> listar() {
        return vistoriaService.listarTodas();
    }

    @GetMapping("/{id}")
    public Vistoria buscarPorId(@PathVariable Long id) {
        return vistoriaService.buscarPorId(id)
                .orElseThrow(() -> new RuntimeException("Vistoria não encontrada com ID: " + id));
    }

    @PostMapping
    public Vistoria criar(@RequestBody Vistoria vistoria) {
        return vistoriaService.salvar(vistoria); // Now using vistoriaService instead of service
    }

    @PutMapping("/{id}")
    public Vistoria atualizar(@PathVariable Long id, @RequestBody Vistoria vistoria) {
        vistoria.setId(id);
        return vistoriaService.salvar(vistoria);
    }

    @DeleteMapping("/{id}")
    public void deletar(@PathVariable Long id) {
        vistoriaService.deletar(id);
    }

    @PutMapping("/{id}/aprovacao")
    public Vistoria atualizarAprovacao(
            @PathVariable Long id,
            @RequestBody AprovacaoDTO dto) {
        return vistoriaService.atualizarAprovacao(id, dto.getAprovacao(), dto.getObservacoesGerente());
    }

}