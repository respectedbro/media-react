export default {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    globals: {
        'ts-jest': {
            // Отключаем проверку типов для тестов
            diagnostics: {
                ignoreCodes: [2307] // Игнорируем ошибку "Cannot find module"
            }
        }
    },
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '\\.(css|scss|sass)$': 'identity-obj-proxy',
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    }
};