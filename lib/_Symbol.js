/*!
 * loltgt ensemble _Symbol
 *
 * @version 0.0.1
 * @link https://github.com/loltgt/ensemble
 * @copyright Copyright (C) Leonardo Laureti
 * @license MIT License
 */

/**
 * @see Symbol()
 *
 * @borrows Symbol as _Symbol
 * @todo backward compatibility
 */
const _Symbol = typeof Symbol == 'undefined' ? 0 : Symbol;

export default _Symbol;
