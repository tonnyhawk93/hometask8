import {it, expect, describe} from '@jest/globals';
import React from 'react';
import {Form} from '../../../src/client/components/Form';
import {render} from '@testing-library/react';
import events from '@testing-library/user-event';

describe('Тестирование формы', () => {
    it('Форма подтверждается при введении правильных данных', () => {
        let result = false;
        const submitForm = () => {
            result = true;
        }
        const form = <Form onSubmit = {submitForm}/>;
        const {container} = render(form);
        events.type(container.querySelector('#f-name'), 'test-name');
        events.type(container.querySelector('#f-phone'), '80172375528');
        events.type(container.querySelector('#f-address'), 'test-name');
        events.click(container.querySelector('.Form-Submit'));
        expect(result).toBeTruthy();
    })
    it('Форма не подтверждается при введении неправильного телефона', () => {
        let result = false;
        const submitForm = () => {
            result = true;
        }
        const form = <Form onSubmit = {submitForm}/>;
        const {container} = render(form);
        events.type(container.querySelector('#f-name'), 'test-name');
        events.type(container.querySelector('#f-phone'), 'wrong-number');
        events.type(container.querySelector('#f-address'), 'test-address');
        events.click(container.querySelector('.Form-Submit'));
        expect(result).toEqual(false);
    })
    it('Форма с пустым адресом не подтверждается', () => {
        let result = false;
        const submitForm = () => {
            result = true;
        }
        const form = <Form onSubmit = {submitForm}/>;
        const {container} = render(form);
        events.type(container.querySelector('#f-name'), 'test-name');
        events.type(container.querySelector('#f-phone'), '80172375528');
        events.click(container.querySelector('.Form-Submit'));
        expect(result).toEqual(false);
    })
    it('Форма с пустым именем не подтверждается', () => {
        let result = false;
        const submitForm = () => {
            result = true;
        }
        const form = <Form onSubmit = {submitForm}/>;
        const {container} = render(form);
        events.type(container.querySelector('#f-phone'), '80172375528');
        events.type(container.querySelector('#f-address'), 'test-address');
        events.click(container.querySelector('.Form-Submit'));
        expect(result).toEqual(false);
    })
    it('Пустая форма не подтверждается', () => {
        let result = false;
        const submitForm = () => {
            result = true;
        }
        const form = <Form onSubmit = {submitForm}/>;
        const {container} = render(form);
        events.click(container.querySelector('.Form-Submit'));
        expect(result).toEqual(false);
    })
})

