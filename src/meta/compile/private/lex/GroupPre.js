import Loc from 'esast/dist/Loc'
import tuple from 'esast/dist/private/tuple'
import { G_Paren, G_Bracket, G_Block, G_Quote, G_Line, G_Space } from '../Token'

export default tuple('GroupPre', Object, 'doc', [ 'loc', Loc, 'k', Number ])

export const groupOpenToClose = k =>
	(k === GP_Line || k === GP_Space) ? k : -k

export const
	GP_OpenParen = G_Paren,
	GP_OpenBracket = G_Bracket,
	GP_OpenBlock = G_Block,
	GP_OpenQuote = G_Quote,
	GP_Line = G_Line,
	GP_Space = G_Space,
	GP_CloseParen = -G_Paren,
	GP_CloseBracket = -G_Bracket,
	GP_CloseBlock = -G_Block,
	GP_CloseQuote = -G_Quote
