# Вычислитель отличий

### Hexlet tests and linter status:
[![Actions Status](https://github.com/R1zd1ch/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/R1zd1ch/frontend-project-46/actions)
[![CI Status](https://github.com/R1zd1ch/frontend-project-46/actions/workflows/linter.yml/badge.svg)](https://github.com/R1zd1ch/frontend-project-46/actions/workflows/linter.yml)
[![Maintainability](https://api.codeclimate.com/v1/badges/a6198ada8157a9e72b61/maintainability)](https://codeclimate.com/github/R1zd1ch/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a6198ada8157a9e72b61/test_coverage)](https://codeclimate.com/github/R1zd1ch/frontend-project-46/test_coverage)

### Описание
Вычислитель отличий – программа, определяющая разницу между двумя структурами данных. Это популярная задача, для решения которой существует множество онлайн сервисов, например http://www.jsondiff.com/. Подобный механизм используется при выводе тестов или при автоматическом отслеживании изменений в конфигурационных файлах.

Возможности утилиты:

- Поддержка разных входных форматов: yaml, json
- Генерация отчета в виде plain text, stylish и json

### Требования:

- node.js

### Установка:

```bash
    git clone git@github.com:R1zd1ch/frontend-project-46.git
    cd frontend-project-46
    make install
    npm link # (Вам может понадобиться использовать sudo)
```

### Помощь запустить gendiff с опцией -h или --help, чтобы увидеть информацию:

```bash
	gendiff -h #(or gendiff --help)
```

##### Демонстрация:

[![asciicast](https://asciinema.org/a/rBGzFS2bMInCZvz2LdNnUDxEz.svg)](https://asciinema.org/a/rBGzFS2bMInCZvz2LdNnUDxEz)

### Запуск:

```bash
	gendiff --format [type] <file1> <file2> #(или -f можно)
```

### GenDiff поддерживает JSON (**.json**), YAML (**.yaml**) и YML (**.yml**) файлы.

##### Демонстрация:

[![asciicast](https://asciinema.org/a/NvSx6jhQYVRrZ33LXl7pklVGe.svg)](https://asciinema.org/a/NvSx6jhQYVRrZ33LXl7pklVGe)

### Форматы

Вы можете выбрать один из трёх форматов при помощи опции -f или --format

#### Stylish (по умолчанию)

```bash
gendiff path/to/file1.json path/to/file2.json
```

```bash
gendiff -f stylish path/to/file1.yaml path/to/file2.yml
```

##### Пример вывода:

```
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
      + setting4: blah blah
      + setting5: {
            key5: value5
        }
        setting6: {
            doge: {
              - wow:
              + wow: so much
            }
            key: value
          + ops: vops
        }
    }
    group1: {
      - baz: bas
      + baz: bars
        foo: bar
      - nest: {
            key: value
        }
      + nest: str
    }
  - group2: {
        abc: 12345
        deep: {
            id: 45
        }
    }
  + group3: {
        deep: {
            id: {
                number: 45
            }
        }
        fee: 100500
    }
}
```
##### Демонстрация:

[![asciicast](https://asciinema.org/a/NvSx6jhQYVRrZ33LXl7pklVGe.svg)](https://asciinema.org/a/NvSx6jhQYVRrZ33LXl7pklVGe)

#### Plain

```bash
gendiff -f plain path/to/file1.json path/to/file2.yml
```

##### Пример вывода:

```
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
```

##### Демонстрация:

[![asciicast](https://asciinema.org/a/0uyaBq4MubFvisetpHBo0y4c2.svg)](https://asciinema.org/a/0uyaBq4MubFvisetpHBo0y4c2)

#### JSON

```bash
gendiff -f json path/to/file1.yml path/to/file2.yml
```

##### Пример вывода:

```
[{"key":"common","type":"nested","children":[{"key":"follow","type":"added","value":false},{"key":"setting1","type":"unchanged","value":"Value 1"},{"key":"setting2","type":"removed","value":200},{"key":"setting3","type":"updated","from":true,"to":null},{"key":"setting4","type":"added","value":"blah blah"},{"key":"setting5","type":"added","value":{"key5":"value5"}},{"key":"setting6","type":"nested","children":[{"key":"doge","type":"nested","children":[{"key":"wow","type":"updated","from":"","to":"so much"}]},{"key":"key","type":"unchanged","value":"value"},{"key":"ops","type":"added","value":"vops"}]}]},{"key":"group1","type":"nested","children":[{"key":"baz","type":"updated","from":"bas","to":"bars"},{"key":"foo","type":"unchanged","value":"bar"},{"key":"nest","type":"updated","from":{"key":"value"},"to":"str"}]},{"key":"group2","type":"removed","value":{"abc":12345,"deep":{"id":45}}},{"key":"group3","type":"added","value":{"deep":{"id":{"number":45}},"fee":100500}}]
```

##### Демонстрация:

[![asciicast](https://asciinema.org/a/odJ2V4tYQlVwwVgihUFwM1OfH.svg)](https://asciinema.org/a/odJ2V4tYQlVwwVgihUFwM1OfH)