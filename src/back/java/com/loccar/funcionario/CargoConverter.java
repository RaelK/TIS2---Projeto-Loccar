package com.loccar.funcionario;

import org.springframework.core.convert.converter.Converter;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

@Component
public class CargoConverter implements Converter<String, Cargo> {

    @Override
    public Cargo convert(@NonNull String source) {
        if (source.isBlank()) {
            throw new IllegalArgumentException("O campo 'cargo' \u00e9 obrigat\u00f3rio.");
        }

        try {
            return Cargo.valueOf(source.trim().toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new IllegalArgumentException(
                "Valor de cargo inv\u00e1lido: '" + source + "'. Valores permitidos: ADMINISTRADOR, FUNCIONARIO.");
        }
    }
}